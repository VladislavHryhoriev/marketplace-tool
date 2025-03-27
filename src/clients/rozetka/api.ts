import { getTokenRozetka } from "@/clients/rozetka/token/get-token-rozetka";
import BASE_URL from "@/consts/BASE_URL";
import { IOrderTemplate } from "@/lib/types/types";
import { toast } from "react-toastify";
import emptyOrder from "./lib/empty-order";
import getOrderTemplate from "./lib/get-order-template";
import {
  IOrder,
  IOrderResponse,
  IOrders,
  IOrdersResponse,
  TExpandNames,
  TRozetkaSearchType,
} from "./types";

interface Params {
  orders: IOrder[];
  token?: string;
  status?: number;
}

class RozetkaApiClient {
  protected async request<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const token = await getTokenRozetka();

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${BASE_URL}/api/rozetka${url}`, {
        headers,
        next: { revalidate: 10 },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const json: T = await response.json();

      return json;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getNewOrders(): Promise<IOrders> {
    const token = await getTokenRozetka();

    const { content, success }: IOrdersResponse =
      await this.request<IOrdersResponse>(`/orders/search?types=4`);

    if (!success) throw new Error("Ошибка получения заказов");

    return { success, orders: content.orders, token };
  }

  async getOrdersByType(type: TRozetkaSearchType): Promise<IOrders> {
    const token = await getTokenRozetka();

    const { content, success }: IOrdersResponse =
      await this.request<IOrdersResponse>(`/orders/search?types=${type}`);

    if (!success) throw new Error("Ошибка получения заказов");

    return { success, orders: content.orders, token };
  }

  async fetchOrder(
    id: string,
    expand: TExpandNames[],
  ): Promise<IOrderResponse["content"]> {
    const {
      content: orderData,
      success,
      errors,
    }: IOrderResponse = await this.request<IOrderResponse>(
      `/orders/${id}?expand=${expand.join(",")}`,
    );

    if (!success && errors) {
      throw new Error(`${errors.message} | ${errors.description}`);
    }

    return orderData;
  }

  async getOrderInfoRozetka(
    id: string,
  ): Promise<{ order: IOrderTemplate; success: boolean }> {
    try {
      const orderData = await this.fetchOrder(id, [
        "delivery",
        "purchases",
        "payment_type_name",
        "payment_type",
      ]);

      const order = getOrderTemplate(orderData);

      return { order, success: true };
    } catch (error) {
      console.error(error);
      return emptyOrder;
    }
  }

  updateOrderStatus = async ({
    orders,
    status = 26, // 26 - Обрабатывается менеджером
  }: Params): Promise<{
    updatedOrders: IOrder[];
  }> => {
    if (!orders.length) return { updatedOrders: [] };

    const ordersToUpdate = orders.filter(
      (order) => order.status === 1 || order.status === 7,
    );

    if (!ordersToUpdate.length) return { updatedOrders: [] };

    try {
      await Promise.all(
        ordersToUpdate.map(async (order) => {
          const response = await this.request<IOrdersResponse>(
            `/orders/${order.id}`,
            { method: "PATCH", body: JSON.stringify({ status }) },
          );

          if (!response.success) {
            throw new Error(`Ошибка при обновлении заказа ${order.id}`);
          }
        }),
      );

      toast.success(`Обновлено: ${ordersToUpdate.length} шт`);
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при обновлении заказов");
    }

    return { updatedOrders: ordersToUpdate };
  };
}

const rozetkaApi = new RozetkaApiClient();

export default rozetkaApi;
