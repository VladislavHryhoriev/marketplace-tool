import LINKS from "@/consts/LINKS";
import { IOrder } from "@/clients/rozetka/types";

export const sendBrowserNotification = async (orders: IOrder[]) => {
  if (orders.length === 0) return;

  if (Notification.permission !== "granted") {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Уведомления запрещены пользователем");
      return;
    }
  }

  const notification = new Notification(`Новых: ${orders.length}шт`, {
    body: orders.reduce(
      (acc, order) =>
        `${acc}\n${order.recipient_title.full_name} - ${order.amount}`,
      "",
    ),
  });

  notification.onclick = () => {
    window.open(`${LINKS.rozetka.new}?page=1&sort=-id&pageSize=50&types=4`);
  };
};
