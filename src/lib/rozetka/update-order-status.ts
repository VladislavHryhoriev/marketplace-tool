import API_URLS from "@/consts/API_URLS";
import { toast } from "react-toastify";
import { IOrder } from "../types/rozetka";
import { getTokenRozetka } from "./get-token-rozetka";

interface Params {
  orders: IOrder[];
  token?: string;
  status?: number;
}

export const updateOrderStatus = async ({
  orders,
  token,
  status = 26, // 26 - Обрабатывается менеджером
}: Params): Promise<{
  updatedOrders: IOrder[];
}> => {
  if (!orders.length) return { updatedOrders: [] };

  const ordersToUpdate = orders.filter(
    (order) => order.status === 1 || order.status === 7,
  );

  if (!ordersToUpdate.length) {
    toast.error("Нет заказов со статусом 1 или 7");
    return { updatedOrders: [] };
  }

  try {
    const validToken = token || (await getTokenRozetka());

    await Promise.all(
      ordersToUpdate.map(async (order) => {
        const response = await fetch(
          API_URLS.rozetka.updateOrderStatus(order.id),
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${validToken}`,
            },
            body: JSON.stringify({ status }),
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
