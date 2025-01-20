import { BASE_URL } from "@/constants";
import { getTokenRozetka } from "./get-token-rozetka";

export interface Order {
  orders: {
    id: number;
    status: number;
    amount: string;
    recipient_title: { full_name: string };
  }[];
  token: string;
}

export const getNewOrders = async (): Promise<Order> => {
  try {
    const token = await getTokenRozetka();
    const response = await fetch(
      // ? Проверка ?status=1
      `${BASE_URL}/api/rozetka/orders/search?types=4`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    const json = await response.json();
    const orders = json.content.orders;

    console.log(orders);

    return { orders, token };
  } catch (error) {
    console.error(error);
    return { orders: [], token: "" };
  }
};
