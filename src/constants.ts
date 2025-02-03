export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : "http://localhost:3000";

export const API_URLS = {
  telegram: {
    sendMessage: `${BASE_URL}/api/telegram/send-message`,
    deleteMessage: `${BASE_URL}/api/telegram/delete-message`,
  },

  rozetka: {
    newOrders: `${BASE_URL}/api/rozetka/orders/search?types=2`,
    orderInfo: (id: string) =>
      `${BASE_URL}/api/rozetka/orders/${id}?expand=delivery,purchases`,
    orders: `${BASE_URL}/api/rozetka/orders`,
    token: `${BASE_URL}/api/rozetka/sites`,
    updateOrderStatus: (id: number) => `${BASE_URL}/api/rozetka/orders/${id}`,
  },

  epicentr: {
    orders: (id: string) =>
      `${BASE_URL}/api/epicentr/v3/oms/orders?filter[number]=${id}`,
    orderInfo: (id: string) => `${BASE_URL}/api/epicentr/v2/oms/orders/${id}`,
  },

  novaPoshta: {
    api: `https://api.novaposhta.ua/v2.0/json/`,
    route: `${BASE_URL}/api/nova-poshta`,
  },
};
