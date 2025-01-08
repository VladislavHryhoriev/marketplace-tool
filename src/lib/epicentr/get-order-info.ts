import { toast } from "react-toastify";
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

    get address() {
      const service =
        orderData.address.shipment.provider === "nova_poshta"
          ? "Нова Пошта"
          : "УкрПошта";
      const office = orderData.office.title;

      return `${service} ${office}`;
    },
  };
};

export const getOrderInfoEpicentr = async (
  id: string,
): Promise<{ order: OrderEpicentr; ok: boolean }> => {
  try {
    const orders = await fetch(
      `/api/epicentr/v3/oms/orders?filter[number]=${id}`,
      { headers },
    ).then((res) => res.json().then((data) => data.items[0]));
    if (!orders) throw new Error("Order not found");

    const response = await fetch(`/api/epicentr/v2/oms/orders/${orders.id}`, {
      headers,
    });

    const orderData: EpicentrOrderResponse = await response.json();
    if (!orderData.number) throw new Error("Order not found");

    return { order: getOrderTemplate(orderData), ok: true };
  } catch (error) {
    console.error(error);
    toast.error("Заказ не найден");
    return {
      order: {
        id: "-1",
        fullname: "",
        products: [],
        address: "",
        deliveryName: "",
        ttn: "",
      },
      ok: false,
    };
  }
};
