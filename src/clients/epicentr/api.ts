import BASE_URL from "@/consts/BASE_URL";
import { IOrderTemplate } from "@/lib/types/types";
import { Order, OrderListModel, TEpicentrSearchType } from "./types";
import getOrderTemplate from "./lib/get-order-template";

class EpicentrApiClient {
  protected token: string | null = null;

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

    const json: T = await response.json();

    return json;
  }

  async fetchOrders(status: TEpicentrSearchType) {
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
          recipient: { name: "", phone: "" },
          user: { name: "", phone: "" },
          products: [],
          address: "",
          deliveryName: "",
          ttn: "",
          amount: 0,
          paymentType: "cash",
          paymentTypeName: "Оплата під час отримання товару",
        },
        success: false,
      };
    }
  }
}

const epicentrApi = new EpicentrApiClient(process.env.EPICENTR_TOKEN!);

export default epicentrApi;
