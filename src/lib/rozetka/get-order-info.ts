import { toast } from "react-toastify";
import { OrderRozetka, RozetkaOrderResponse } from "../types";
import { getTokenRozetka } from "./get-token-rozetka";
import { BASE_URL } from "@/constants";

const getOrderTemplate = (content: RozetkaOrderResponse["content"]) => {
  return {
    id: content.id,
    fullname: content.recipient_title.full_name,
    products: content.purchases,
    deliveryName: content.delivery.name_logo,
    totalQuantity: content.totalQuantity,
    ttn: content.ttn,
    phone: content.recipient_phone,

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
): Promise<{ order: OrderRozetka; ok: boolean }> => {
  try {
    const token = await getTokenRozetka();
    const response = await fetch(
      `${BASE_URL}/api/rozetka/orders/${id}?expand=delivery,purchases`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    const { success, content, errors }: RozetkaOrderResponse =
      await response.json();

    if (!success) {
      toast.error(errors.description);
      throw new Error(`${errors.message} | ${errors.description}`);
    }

    return { order: getOrderTemplate(content), ok: true };
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
      },
      ok: false,
    };
  }
};
