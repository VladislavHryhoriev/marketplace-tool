import { TExpandNames } from "@/clients/rozetka/types";
import { config } from "@/config";
import BASE_URL from "./BASE_URL";

const API_URLS = {
  telegram: {
    sendMessage: `${BASE_URL}/api/telegram/send-message`,
    deleteMessage: `${BASE_URL}/api/telegram/delete-message`,
  },

  rozetka: {
    newOrders: `${BASE_URL}/api/rozetka/orders/search?types=${config.rozetka.searchType}`, // 4 new
    orderInfo: (id: string, expand: TExpandNames[]) =>
      `${BASE_URL}/api/rozetka/orders/${id}?expand=${expand?.join(",")}`,
    orders: `${BASE_URL}/api/rozetka/orders`,
    token: `${BASE_URL}/api/rozetka/sites`,
    updateOrderStatus: (id: number) => `${BASE_URL}/api/rozetka/orders/${id}`,
  },

  novaPoshta: { route: `${BASE_URL}/api/nova-poshta` },
};

export default API_URLS;
