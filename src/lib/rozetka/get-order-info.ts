import { BASE_URL } from "@/constants";
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

interface GetRozetkaInfoTypes {
  inputID: string;
  setAreaText: React.Dispatch<React.SetStateAction<string>>;
  type?: string;
}

export const getOrderInfo = async (id: string): Promise<{ order: Order }> => {
  try {
    const token = await getTokenRozetka();
    const response: Response = await fetch(
      `${BASE_URL}/api/rozetka/orders/${id}?expand=delivery`,
      { headers: { Authorization: `Bearer ${token}` } },
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

export const getRozetkaInfo = async ({
  inputID,
  setAreaText,
  type,
}: GetRozetkaInfoTypes) => {
  const { order } = await getOrderInfo(inputID);
  const cost = order.deliveryName === "nova-pochta" ? [105, 80] : [60, 45];

  const text = `
Добрий день. Не вдалося зв'язатися по номеру телефона, який Ви залишили в замовленні. 
Будь ласка, зателефонуйте нам для підтвердження замовлення 
(068)554-40-46 (063)969-68-29 (099)566-45-21

*Замовили:* ${order.products.map((product) => `${order.products.length > 1 ? "\n- " : ""}${product.item_name}`)}
*Отримувач:* ${order.fullname}
*Адрес доставки:* ${order.address}
*Вартість доставки:* ~${cost[0]}грн (якщо хочете по передоплаті то буде ~${cost[1]}грн)`.trim();

  setAreaText(type !== "viber" ? text : text.replaceAll("*", ""));
};
