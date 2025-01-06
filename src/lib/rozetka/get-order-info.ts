import { OrderRozetka } from "../types";
import { getTokenRozetka } from "./get-token-rozetka";

interface ApiResponse {
  errors: {
    message: string;
    description: string;
    details: { value: string };
  };
  success: boolean;
  content: {
    id: number;
    recipient_title: { full_name: string };
    purchases: { item_name: string; cost: string; quantity: number }[];
    delivery: {
      delivery_service_name: string;
      delivery_method_id: number;
      city: { name_ua: string };
      place_street: string;
      place_house: string;
      place_number: string;
      place_flat: string;
      name_logo: string;
    };
    total_quantity: number;
    ttn: string;
  };
}

export const getOrderInfoRozetka = async (
  id: string,
): Promise<{ order: OrderRozetka }> => {
  try {
    const token = await getTokenRozetka();
    const response = await fetch(
      `/api/rozetka/orders/${id}?expand=delivery,purchases`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    const { success, content, errors }: ApiResponse = await response.json();

    if (!success) throw new Error(`${errors.message} | ${errors.description}`);

    const order = {
      id: content.id,
      fullname: content.recipient_title.full_name,
      products: content.purchases,
      deliveryName: content.delivery.name_logo,
      total_quantity: content.total_quantity,
      ttn: content.ttn,

      get address() {
        const deliveryService = content.delivery.delivery_service_name;
        const deliveryMethod = content.delivery.delivery_method_id;
        const city = content.delivery.city.name_ua;
        const street = content.delivery.place_street;
        const house = content.delivery.place_house;
        const departmentNumber = content.delivery.place_number;
        const flat = content.delivery.place_flat;

        if (deliveryMethod === 1) {
          return `(${deliveryService}) ${city}, ${street} ${house}, Відділення №${departmentNumber}`;
        }

        if (deliveryMethod === 2) {
          return `Адресна: (${deliveryService}) ${city}, ${street} ${house}, кв. ${flat}`;
        }

        return `${deliveryMethod}`;
      },
    };

    return { order };
  } catch (error) {
    console.error(error);
    return {
      order: {
        id: -1,
        fullname: "",
        products: [],
        address: "",
        deliveryName: "",
        total_quantity: -1,
        ttn: "",
      },
    };
  }
};
