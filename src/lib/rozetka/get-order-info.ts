import { API_URLS } from "@/consts/API_URLS";
import { toast } from "react-toastify";
import {
  IExtendDelivery,
  IExtendPurchases,
  IOrder,
  IOrderResponse,
} from "../types/rozetka";
import { getTokenRozetka } from "./get-token-rozetka";
import { IOrderTemplate } from "../types/types";

const getOrderTemplate = (
  orderData: IOrder & IExtendDelivery & IExtendPurchases,
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
    const token = await getTokenRozetka();
    const response = await fetch(API_URLS.rozetka.orderInfo(id), {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 30 },
    });

    const {
      success,
      content: orderData,
      errors,
    }: IOrderResponse = await response.json();

    if (!success && errors) {
      toast.error(errors.description);
      throw new Error(`${errors.message} | ${errors.description}`);
    }

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
