import { API_URLS } from "@/consts/API_URLS";
import { toast } from "react-toastify";
import {
  IExtendDelivery,
  IExtendPurchases,
  IOrder,
  IOrderResponse,
  IOrderRozetkaTemplate,
} from "../types/rozetka";
import { getTokenRozetka } from "./get-token-rozetka";

const getOrderRozetkaTemplate = (
  content: IOrder & IExtendDelivery & IExtendPurchases,
) => {
  return {
    id: content.id,
    fullname: content.delivery.recipient_title,
    products: content.purchases,
    deliveryName: content.delivery.name_logo,
    totalQuantity: content.total_quantity,
    ttn: content.ttn,
    phone: content.recipient_phone,
    amount: content.amount,

    get address() {
      const deliveryService = content.delivery.delivery_service_name;
      const deliveryMethod = content.delivery.delivery_method_id;
      const city = content.delivery.city.name_ua;
      const street = content.delivery.place_street;
      const house = content.delivery.place_house;
      const departmentNumber = content.delivery.place_number;
      const flat = content.delivery.place_flat;

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
): Promise<{ order: IOrderRozetkaTemplate; success: boolean }> => {
  try {
    const token = await getTokenRozetka();
    const response = await fetch(API_URLS.rozetka.orderInfo(id), {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 30 },
    });

    const { success, content, errors }: IOrderResponse = await response.json();

    if (!success && errors) {
      toast.error(errors.description);
      throw new Error(`${errors.message} | ${errors.description}`);
    }

    const order = getOrderRozetkaTemplate(content);

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
        totalQuantity: -1,
        ttn: "",
        phone: "",
        amount: "-1",
      },
      success: false,
    };
  }
};
