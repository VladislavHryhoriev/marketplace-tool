import BASE_URL from "@/consts/BASE_URL";
import { Order, OrderListModel, OrderStatus } from "./types";

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
}

const epicentrApi = new EpicentrApiClient(process.env.EPICENTR_TOKEN!);

export default epicentrApi;
