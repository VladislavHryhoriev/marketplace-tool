import {
  IExtendDelivery,
  IExtendPaymentType,
  IExtendPaymentTypeName,
  IExtendPurchases,
  IOrder,
} from "@/clients/rozetka/types";
import { IOrderTemplate } from "../types/types";
import fetchOrder from "./fetch-order";

const getOrderTemplate = (
  orderData: IOrder &
    IExtendDelivery &
    IExtendPurchases &
    IExtendPaymentType &
    IExtendPaymentTypeName,
): IOrderTemplate => {
  return {
    id: orderData.id,
    recipient: {
      name: orderData.delivery.recipient_title,
      phone: orderData.recipient_phone,
    },
    user: {
      name: orderData.user_title.full_name,
      phone: orderData.user_phone,
    },
    products: [
      ...orderData.purchases.map((item) => ({
        title: item.item_name,
        quantity: item.quantity,
        cost: item.cost,
      })),
    ],
    deliveryName: orderData.delivery.name_logo,
    ttn: orderData.ttn,
    amount: orderData.amount,
    paymentType: orderData.payment_type,
    paymentTypeName: orderData.payment_type_name,

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
      "payment_type_name",
      "payment_type",
    ]);

    const order = getOrderTemplate(orderData);

    return { order, success: true };
  } catch (error) {
    console.error(error);
    return {
      order: {
        id: -1,
        recipient: { name: "", phone: "" },
        user: { name: "", phone: "" },
        products: [],
        address: "",
        deliveryName: "",
        ttn: "",
        amount: "-1",
        paymentType: "cash",
        paymentTypeName: "",
      },
      success: false,
    };
  }
};
