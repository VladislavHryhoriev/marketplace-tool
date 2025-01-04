import { OrderAllo } from "../types";

// interface ApiResponse {
//   orders: [
//     {
//       id: "103255297";
//       partner_id: "223";
//       payment_type: "Наличными, при получении заказа";
//       payment_type_id: "checkmo";
//       note: "коммент";
//       products: [
//         {
//           name: "JBL NovoMalawi корм для рыб, 1 л";
//           quantity: 1;
//           price: 313;
//           amount: 313;
//           partner_price: "46.0001";
//         },
//       ];
//       customer: {
//         firstname: "Firstname";
//         middlename: "Middlename";
//         lastname: "Lastname";
//         telephone: "+380501111111";
//       };
//       status: {
//         status: 1;
//         cancel_status_id: "2";
//       };
//       shipping: {
//         tracking_number: "1321331233321";
//         type: 'В отделение "Нова пошта"';
//         shipping_id: "4";
//         city: "Киев";
//         region_name: "Киевская";
//         city_uid: "5CB61671-749B-11DF-B112-00215AEE3EBE";
//         price: 50;
//         address: {
//           city: "Киев";
//           city_uid: "31231241";
//           street: "Волошина";
//           house: "19";
//           apartment: "2";
//         };
//         stock: {
//           name: "Склад №1: пл. Привокзальная, 10/3";
//           stock_number: "NP119";
//         };
//       };
//       not_call_me: true;
//     },
//   ];
//   total_records: 1;
// }

interface ApiResponse {
  orders: Array<{
    id: string;
    partner_id: string;
    payment_type: string;
    payment_type_id: string;
    note: string;
    products: Array<{
      name: string;
      quantity: number;
      price: number;
      amount: number;
      partner_price: string;
    }>;
    customer: {
      firstname: string;
      middlename: string;
      lastname: string;
      telephone: string;
    };
    status: {
      status: number;
      cancel_status_id: string;
    };
    shipping: {
      tracking_number: string;
      type: string;
      shipping_id: string;
      city: string;
      region_name: string;
      city_uid: string;
      price: number;
      address: {
        city: string;
        city_uid: string;
        street: string;
        house: string;
        apartment: string;
      };
      stock: {
        name: string;
        stock_number: string;
      };
    };
    not_call_me: boolean;
  }>;
  total_records: number;
}

export const getOrderInfoAllo = async (
  id: string,
): Promise<{ order: OrderAllo }> => {
  try {
    const headers = {
      api_version: "2",
    };

    const response = await fetch(`/api/allo/login`, {
      headers,
      method: "POST",
      body: JSON.stringify({
        username: process.env.ALLO_USERNAME,
        apiKey: process.env.ALLO_PASSWORD,
      }),
    });

    // const response = await fetch(`/api/epicentr/v2/oms/orders/${orderId}`, {
    //   headers,
    // });

    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const orderData: ApiResponse = await response.json();

    console.log(orderData);

    // const order = {
    //   id: orderData.number,
    //   fullname: `${orderData.address.firstName} ${orderData.address.lastName} ${orderData.address.patronymic}`,
    //   products: [
    //     ...orderData.items.map((item) => ({
    //       title: item.title,
    //       quantity: item.quantity,
    //       subtotal: item.subtotal,
    //     })),
    //   ],
    //   deliveryName: orderData.address.shipment.provider,
    //   ttn: orderData.address.shipment.number,

    //   get address() {
    //     const service =
    //       orderData.address.shipment.provider === "nova_poshta"
    //         ? "Нова Пошта"
    //         : "УкрПошта";
    //     const office = orderData.office.title;

    //     return `${service} ${office}`;
    //   },
    // };

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
