import BASE_URL from "@/consts/BASE_URL";
import { IOrderTemplate } from "@/lib/types/types";
import { Order, OrderListModel, OrderStatus } from "./types";

const getOrderTemplate = (orderData: Order): IOrderTemplate => {
  return {
    id: orderData.number,
    fullname: `${orderData.address.lastName} ${orderData.address.firstName} ${orderData.address.patronymic}`,
    products: [
      ...orderData.items.map((item) => ({
        title: item.title!,
        quantity: item.quantity!,
        cost: item.subtotal!,
        measure: item.measure!,
      })),
    ],
    deliveryName: orderData.address.shipment?.provider ?? "",
    ttn: orderData.address.shipment?.number ?? "",
    phone: orderData.address.phone ?? "",
    amount: orderData.subtotal,

    get address() {
      const service =
        orderData.address.shipment?.provider === "nova_poshta"
          ? "Нова Пошта"
          : "УкрПошта";
      const office = orderData.office?.title;
      const city = orderData.settlement?.title;

      return `(${service}) ${city} ${office}`;
    },
  };
};

class EpicentrApiClient {
  private token: string | null = null;

  constructor(token: string) {
    this.token = token;
  }

  setToken(token: string) {
    this.token = token;
  }

  protected async request<T>(url: string, options?: RequestInit): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "accept-language": "uk",
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
    };

    const response = await fetch(`${BASE_URL}/api/epicentr${url}`, {
      headers,
      next: { revalidate: 10 },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async fetchOrders(status: `${OrderStatus}`) {
    return this.request<OrderListModel>(
      `/v3/oms/orders?filter[statusCode][]=${status}`,
    );
  }

  async fetchOrderById(orderNumber: string) {
    const orderId = await this.request<OrderListModel>(
      `/v3/oms/orders?filter[number]=${orderNumber}`,
    ).then((res) => res.items[0].id);

    return this.request<Order>(`/v2/oms/orders/${orderId}`);
  }

  async getOrderInfoEpicentr(
    id: string,
  ): Promise<{ order: IOrderTemplate; success: boolean }> {
    try {
      const orderData = await this.fetchOrderById(id);
      if (!orderData.number) throw new Error("Order not found");

      return { order: getOrderTemplate(orderData), success: true };
    } catch (error) {
      return {
        order: {
          id: "-1",
          fullname: "",
          products: [],
          address: "",
          deliveryName: "",
          ttn: "",
          phone: "",
          amount: 0,
        },
        success: false,
      };
    }
  }
}

const epicentrApi = new EpicentrApiClient(process.env.EPICENTR_TOKEN!);

export default epicentrApi;
