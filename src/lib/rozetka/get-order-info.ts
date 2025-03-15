import {
  IExtendCountBuyerOrders,
  IExtendDelivery,
  IExtendPurchases,
  IOrder,
} from "../types/rozetka";
import { IOrderTemplate } from "../types/types";
import fetchOrder from "./fetch-order";

const getOrderTemplate = (
  orderData: IOrder &
    IExtendDelivery &
    IExtendPurchases &
    IExtendCountBuyerOrders,
): IOrderTemplate => {
  return {
    id: orderData.id,
    fullname: orderData.delivery.recipient_title,
    products: [
      ...orderData.purchases.map((item) => ({
        title: item.item_name,
        quantity: item.quantity,
        cost: item.cost,
      })),
    ],
    deliveryName: orderData.delivery.name_logo,
    ttn: orderData.ttn,
    phone: orderData.recipient_phone,
    amount: orderData.amount,

    get address() {
      const deliveryService = orderData.delivery.delivery_service_name;
      const deliveryMethod = orderData.delivery.delivery_method_id;
      const city = orderData.delivery.city.name_ua;
      const street = orderData.delivery.place_street;
      const house = orderData.delivery.place_house;
      const departmentNumber = orderData.delivery.place_number;
      const flat = orderData.delivery.place_flat;

      if (deliveryMethod === 1) {
        return `(${deliveryService}) Відділення №${departmentNumber} ${city}, ${street} ${house}`;
      }

      if (deliveryMethod === 2) {
        return `Адресна: (${deliveryService}) ${city}, ${street} ${house}, кв. ${flat}`;
      }

      return `${deliveryMethod}`;
    },
  };
};

export const getOrderInfoRozetka = async (
  id: string,
): Promise<{ order: IOrderTemplate; success: boolean }> => {
  try {
    const orderData = await fetchOrder(id, [
      "delivery",
      "purchases",
      "count_buyer_orders",
    ]);

    const order = getOrderTemplate(orderData);

    return { order, success: true };
  } catch (error) {
    console.error(error);
    return {
      order: {
        id: -1,
        fullname: "",
        products: [],
        address: "",
        deliveryName: "",
        ttn: "",
        phone: "",
        amount: "-1",
      },
      success: false,
    };
  }
};
