import { API_URLS } from "@/constants";
import { toast } from "react-toastify";
import { IOrder } from "../types/rozetka";
import { getNewOrders } from "./get-new-orders";

export const updateOrderStatus = async (): Promise<{
  updatedOrders: IOrder[];
}> => {
  toast.dismiss();
  const { orders, token } = await getNewOrders();

  if (!orders.length) {
    toast.warn("Новых заказов нет");
    return { updatedOrders: [] };
  }

  const ordersToUpdate = orders.filter(
    (order) => order.status === 1 || order.status === 7,
  );

  if (!ordersToUpdate.length) {
    toast.error("Нет заказов со статусом 1 или 7");
    return { updatedOrders: [] };
  }

  const requestBody = { status: 26 }; // 26 - Обрабатывается менеджером

  try {
    await Promise.all(
      ordersToUpdate.map(async (order) => {
        const response = await fetch(
          API_URLS.rozetka.updateOrderStatus(order.id),
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
          },
        );

        if (!response.ok) {
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
