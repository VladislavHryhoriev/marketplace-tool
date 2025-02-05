import { API_URLS } from "@/constants";
import { toast } from "react-toastify";
import { IOrder } from "../types/rozetka";
import { getNewOrders } from "./get-new-orders";

export const updateOrderStatus = async (): Promise<{ orders: IOrder[] }> => {
  const { orders, token } = await getNewOrders();
  const requestBody = { status: 26 }; // 26 - Обрабатывается менеджером

  orders.forEach(async (order) => {
    if (order.status !== 1 && order.status !== 7) {
      toast.error("Статус заказа не равен 1 или 7");
      return;
    }

    try {
      await fetch(API_URLS.rozetka.updateOrderStatus(order.id), {
        method: "PATCH",
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
