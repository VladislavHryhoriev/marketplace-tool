import { BASE_URL } from "@/constants";
import { getTokenRozetka } from "./get-token-rozetka";

interface Order {
  orders: { id: number; status: number }[];
  token: string;
}

export const getNewOrders = async (): Promise<Order> => {
  const token = await getTokenRozetka();

  const response = await fetch(
    `${BASE_URL}/api/rozetka/orders/search?status=1`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const json = await response.json();
  const orders = json.content.orders;

  return { orders, token };
};
