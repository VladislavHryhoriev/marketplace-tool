import { getTokenRozetka } from "./get-token-rozetka";

export interface Order {
  orders: { id: number; status: number }[];
  token: string;
}

export const getNewOrders = async (): Promise<Order> => {
  const token = await getTokenRozetka();

  const response = await fetch(`/api/rozetka/orders/search?status=1`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await response.json();
  const orders = json.content.orders;

  return { orders, token };
};
