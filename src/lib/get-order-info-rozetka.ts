import { getTokenRozetka } from "./get-token-rozetka";

interface Order {
  fullname: string;
  products: { item_name: number; item_price: number }[];
  address: string;
  deliveryName: string;
}

interface ApiResponse {
  content: {
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
  };
}

export const getOrderInfo = async (id: string): Promise<{ order: Order }> => {
  try {
    const token = await getTokenRozetka();
    const response: Response = await fetch(
      `/api/orders/${id}?expand=delivery`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const { content }: ApiResponse = await response.json();

    console.log(content);

    const order: Order = {
      fullname: content.recipient_title.full_name,
      products: content.items_photos,
      deliveryName: content.delivery.name_logo,

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
      order: { fullname: "", products: [], address: "", deliveryName: "" },
    };
  }
};
