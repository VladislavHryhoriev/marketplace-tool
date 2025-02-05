import { API_URLS } from "@/constants";
import { IOrder, IOrdersResponse } from "../types/rozetka";
import { getTokenRozetka } from "./get-token-rozetka";
import { toast } from "react-toastify";

export interface Orders {
  success: boolean;
  orders: IOrder[];
  token: string;
}

export const getNewOrders = async (): Promise<Orders> => {
  try {
    const token = await getTokenRozetka();
    const response = await fetch(API_URLS.rozetka.newOrders, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!API_URLS.rozetka.newOrders.includes("types=4")) {
      toast.error("Тип заказов != 4");
    }

    const { content, success }: IOrdersResponse = await response.json();

    if (!success) throw new Error("Ошибка получения заказов");

    return { success, orders: content.orders, token };
  } catch (error) {
    console.error(error);
    return { success: false, orders: [], token: "" };
  }
};
