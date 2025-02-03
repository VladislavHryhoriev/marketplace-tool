import { API_URLS } from "@/constants";
import { EpicentrOrderResponse, OrderEpicentr } from "../types";

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.EPICENTR_TOKEN}`,
  "accept-language": "uk",
};

const getOrderTemplate = (orderData: EpicentrOrderResponse) => {
  return {
    id: orderData.number,
    fullname: `${orderData.address.firstName} ${orderData.address.lastName} ${orderData.address.patronymic}`,
    products: [
      ...orderData.items.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
    ],
    deliveryName: orderData.address.shipment.provider,
    ttn: orderData.address.shipment.number,
    phone: orderData.address.phone,

    get address() {
      const service =
        orderData.address.shipment.provider === "nova_poshta"
          ? "Нова Пошта"
          : "УкрПошта";
      const office = orderData.office.title;
      const city = orderData.settlement.title;

      return `(${service}) ${city} ${office}`;
    },
  };
};

export const getOrderInfoEpicentr = async (
  id: string,
): Promise<{ order: OrderEpicentr; success: boolean }> => {
  try {
    const orders = await fetch(API_URLS.epicentr.orders(id), {
      headers,
      next: { revalidate: 10 },
    }).then((res) => res.json().then((data) => data.items[0]));

    if (!orders) throw new Error("Order not found");

    const response = await fetch(API_URLS.epicentr.orderInfo(orders.id), {
      headers,
    });

    const orderData: EpicentrOrderResponse = await response.json();
    if (!orderData.number) throw new Error("Order not found");

    return { order: getOrderTemplate(orderData), success: true };
  } catch (error) {
    return {
      order: {
        id: "-1",
        fullname: "",
        products: [],
        address: "",
        deliveryName: "",
        ttn: "",
        phone: "",
      },
      success: false,
    };
  }
};
