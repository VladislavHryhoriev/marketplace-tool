import { Order } from "@/clients/epicentr/types";
import { IOrder } from "@/clients/rozetka/types";
import LINKS from "@/consts/LINKS";

export const createMessage = (
  ordersRozetka: IOrder[],
  ordersEpicentr: Order[],
) => {
  const messageRozetka = ordersRozetka
    ? ordersRozetka
        .map((order) => {
          const link = `${LINKS.rozetka.new}?page=1&sort=-id&pageSize=50&id=${order.id}`;
          return `<a href="${link}">${order.recipient_title.full_name}</a> - ${order.amount}`;
        })
        .join("\n")
    : "";

  const messageEpicentr = ordersEpicentr
    ? ordersEpicentr
        .map((order) => {
          const link = `https://admin.epicentrm.com.ua/oms/orders/${order.id}`;
          const fullName = `${order.address.lastName} ${order.address.firstName} ${order.address.patronymic}`;
          return `<a href="${link}">${fullName}</a> - ${order.subtotal}`;
        })
        .join("\n")
    : "";

  if (messageRozetka.length === 0) return `🔵 Эпицентр:\n${messageEpicentr}`;
  if (messageEpicentr.length === 0) return `🟢 Розетка:\n${messageRozetka}`;

  return `🟢 Розетка:\n${messageRozetka}\n\n🔵 Эпицентр:\n${messageEpicentr}`;
};
