import { Order } from "../types";

interface ApiResponse {
  items: {
    address: {
      firstName: string;
      lastName: string;
      patronymic: string;
      phone: string;
    };
  }[];
}

export const getOrderInfoEpicentr = async (
  id: string,
): Promise<{ order: Order }> => {
  try {
    const token = process.env.EPICENTR_TOKEN;

    const response = await fetch(
      // `/api/epicentr/v3/oms/orders?filter[number]=${id}`,
      `/api/epicentr/v2/oms/orders/4480f270-2852-447e-a9ba-a70b43c5c865`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const json: ApiResponse = await response.json();

    console.log(json);

    const order = {
      id: 0,
      fullname: "",
      products: [],
      deliveryName: "",
      ttn: "",

      get address() {
        const deliveryService = "";
        const deliveryMethod = 1;
        const city = "";
        const street = "";
        const house = "";
        const departmentNumber = "";
        const flat = "";

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
    console.log(error);

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
