import { BASE_URL } from "@/constants";
import { IOrder, IOrdersResponse } from "../types/rozetka";
import { getTokenRozetka } from "./get-token-rozetka";

export interface Orders {
  success: boolean;
  orders: IOrder[];
  token: string;
}

export const getNewOrders = async (): Promise<Orders> => {
  try {
    const token = await getTokenRozetka();
    const response = await fetch(
      // ? Проверка ?status=1
      `${BASE_URL}/api/rozetka/orders/search?types=2`, // 4 - Нові замовлення
      { headers: { Authorization: `Bearer ${token}` } },
    );

    const { content, success }: IOrdersResponse = await response.json();

    if (!success) throw new Error("Помилка при отриманні замовлень");

    return { success, orders: content.orders, token };
  } catch (error) {
    console.error(error);
    return { success: false, orders: [], token: "" };
  }
};
