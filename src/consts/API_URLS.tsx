import { TExpandNames } from "@/lib/types/rozetka";
import BASE_URL from "./BASE_URL";

const API_URLS = {
  telegram: {
    sendMessage: `${BASE_URL}/api/telegram/send-message`,
    deleteMessage: `${BASE_URL}/api/telegram/delete-message`,
  },

  rozetka: {
    newOrders: `${BASE_URL}/api/rozetka/orders/search?types=2`, // 4 new
    orderInfo: (id: string, expand: TExpandNames[]) =>
      `${BASE_URL}/api/rozetka/orders/${id}?expand=${expand?.join(",")}`,
    orders: `${BASE_URL}/api/rozetka/orders`,
    token: `${BASE_URL}/api/rozetka/sites`,
    updateOrderStatus: (id: number) => `${BASE_URL}/api/rozetka/orders/${id}`,
  },

  epicentr: {
    orders: `${BASE_URL}/api/epicentr/v3/oms/orders?filter[statusCode][]=confirmed_by_merchant`,
    order: (orderNum: string) =>
      `${BASE_URL}/api/epicentr/v3/oms/orders?filter[number]=${orderNum}`,
    orderInfo: (orderId: string) =>
      `${BASE_URL}/api/epicentr/v2/oms/orders/${orderId}`,
  },

  novaPoshta: { route: `${BASE_URL}/api/nova-poshta` },
} as const;

export default API_URLS;
