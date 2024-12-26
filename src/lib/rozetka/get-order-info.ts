import { BASE_URL } from "@/constants";
import { getTokenRozetka } from "./get-token-rozetka";
import { Order } from "../types";

interface ApiResponse {
  content: {
    id: number;
    recipient_title: { full_name: string };
    items_photos: { item_name: number; item_price: number }[];
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
    ttn: string;
  };
}

export const getOrderInfoRozetka = async (
  id: string,
): Promise<{ order: Order }> => {
  try {
    const token = await getTokenRozetka();
    const response: Response = await fetch(
      `${BASE_URL}/api/rozetka/orders/${id}?expand=delivery`,
      { headers: { Authorization: `Bearer ${token}` } },
    );

    const { content }: ApiResponse = await response.json();

    const order = {
      id: content.id,
      fullname: content.recipient_title.full_name,
      products: content.items_photos,
      deliveryName: content.delivery.name_logo,
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
        ttn: "",
      },
    };
  }
};
