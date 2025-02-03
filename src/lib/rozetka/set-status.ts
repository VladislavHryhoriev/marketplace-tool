import { API_URLS } from "@/constants";
import { IOrder } from "../types/rozetka";
import { getNewOrders } from "./get-new-orders";

export const updateOrderStatus = async (): Promise<{ orders: IOrder[] }> => {
  const { orders, token } = await getNewOrders();
  const requestBody = { status: 26 }; // 26 - Обрабатывается менеджером

  orders.forEach(async (order) => {
    try {
      await fetch(API_URLS.rozetka.updateOrderStatus(order.id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
    } catch (error) {
      console.error(error);
    }
  });

  return { orders };
};
