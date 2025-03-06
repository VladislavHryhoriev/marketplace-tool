import API_URLS from "@/consts/API_URLS";
import { EpicentrOrderResponse, IOrderTemplate } from "../types/types";
import fetchOrder from "./fetch-order";

const getOrderTemplate = (orderData: EpicentrOrderResponse): IOrderTemplate => {
  return {
    id: orderData.number,
    fullname: `${orderData.address.lastName} ${orderData.address.firstName} ${orderData.address.patronymic}`,
    products: [
      ...orderData.items.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        cost: item.subtotal,
        measure: item.measure,
      })),
    ],
    deliveryName: orderData.address.shipment.provider,
    ttn: orderData.address.shipment.number,
    phone: orderData.address.phone,
    amount: orderData.subtotal,

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
): Promise<{ order: IOrderTemplate; success: boolean }> => {
  try {
    const orderData: EpicentrOrderResponse = await fetchOrder(id);
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
        amount: 0,
      },
      success: false,
    };
  }
};
