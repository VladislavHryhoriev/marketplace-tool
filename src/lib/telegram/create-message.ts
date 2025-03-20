import LINKS from "@/consts/LINKS";
import { IOrder } from "../types/rozetka";
import { Order } from "@/clients/epicentr/types";

export const createMessage = (
  ordersRozetka: IOrder[],
  ordersEpicentr: Order[],
) => {
  const messageRozetka = ordersRozetka
    .map((order) => {
      const link = `${LINKS.rozetka.new}?page=1&sort=-id&pageSize=50&id=${order.id}`;
      return `№${order.id} <a href="${link}">${order.recipient_title.full_name}</a> - ${order.amount}`;
    })
    .join("\n");

  const messageEpicentr = ordersEpicentr
    .map((order) => {
      const link = `https://admin.epicentrm.com.ua/oms/orders/${order.id}`;
      const fullName = `${order.address.lastName} ${order.address.firstName} ${order.address.patronymic}`;
      return `№${order.number} <a href="${link}">${fullName}</a> - ${order.subtotal}`;
    })
    .join("\n");

  const message = `Розетка:\n${messageRozetka}\n\nЭпицентр:\n${messageEpicentr}`;

  return message;
};
