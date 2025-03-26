import { IOrderTemplate } from "@/lib/types/types";
import { Order } from "../types";

const getOrderTemplate = (orderData: Order): IOrderTemplate => {
  console.log(orderData);

  return {
    id: orderData.number,
    recipient: {
      name: `${orderData.address.lastName} ${orderData.address.firstName} ${orderData.address.patronymic}`,
      phone: orderData.address.phone ?? "",
    },
    user: {
      name: `${orderData.address.lastName} ${orderData.address.firstName} ${orderData.address.patronymic}`,
      phone: orderData.address.phone ?? "",
    },
    products: [
      ...orderData.items.map((item) => ({
        title: item.title!,
        quantity: item.quantity!,
        cost: item.subtotal!,
        measure: item.measure!,
      })),
    ],
    deliveryName: orderData.address.shipment?.provider ?? "",
    ttn: orderData.address.shipment?.number ?? "",
    amount: orderData.subtotal,
    paymentType: "cash",
    paymentTypeName: "Оплата під час отримання товару", // WARN: add payment type name
    get address() {
      const service =
        orderData.address.shipment?.provider === "nova_poshta"
          ? "Нова Пошта"
          : "УкрПошта";
      const office = orderData.office?.title;
      const city = orderData.settlement?.title;

      return `(${service}) ${city} ${office}`;
    },
  };
};

export default getOrderTemplate;
