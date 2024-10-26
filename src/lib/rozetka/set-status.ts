import { getNewOrders } from "./get-new-orders";

export const setStatus = async () => {
  const { orders, token } = await getNewOrders();
  const requestBody = { status: 26 }; // 26 - Обрабатывается менеджером

  orders.forEach(async (order) => {
    try {
      await fetch(`/api/rozetka/orders/${order.id}`, {
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
