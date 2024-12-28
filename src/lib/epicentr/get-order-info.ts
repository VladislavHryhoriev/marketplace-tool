import { OrderEpicentr, OrderRozetka } from "../types";

interface ApiResponse {
  address: {
    firstName: string;
    lastName: string;
    patronymic: string;
    phone: string;
    shipment: { provider: "nova_poshta" | "ukrposhta"; number: string };
  };
  number: string;
  subtotal: number;
  office: { title: string };
  items: { title: string; quantity: number; subtotal: number }[];
}

export const getOrderInfoEpicentr = async (
  id: string,
): Promise<{ order: OrderEpicentr }> => {
  try {
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${process.env.EPICENTR_TOKEN}`,
      "accept-language": "uk",
    };

    const orderId = await fetch(
      `/api/epicentr/v3/oms/orders?filter[number]=${id}`,
      { headers },
    ).then((res) => res.json().then((data) => data.items[0].id));

    const response = await fetch(`/api/epicentr/v2/oms/orders/${orderId}`, {
      headers,
    });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const orderData: ApiResponse = await response.json();

    console.log(orderData);

    const order = {
      id: orderData.number,
      fullname: `${orderData.address.firstName} ${orderData.address.lastName} ${orderData.address.patronymic}`,
      products: [
        ...orderData.items.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          subtotal: item.subtotal,
        })),
      ],
      deliveryName: orderData.address.shipment.provider,
      ttn: orderData.address.shipment.number,

      get address() {
        const service =
          orderData.address.shipment.provider === "nova_poshta"
            ? "Нова Пошта"
            : "УкрПошта";
        const office = orderData.office.title;

        return `${service} ${office}`;
      },
    };

    return { order };
  } catch (error) {
    console.log(error);

    return {
      order: {
        id: "-1",
        fullname: "",
        products: [],
        address: "",
        deliveryName: "",
        ttn: "",
      },
    };
  }
};
