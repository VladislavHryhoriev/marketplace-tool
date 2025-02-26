import { config } from "@/config";
import { LINKS } from "@/consts/LINKS";
import { getNewOrders } from "@/lib/rozetka/get-new-orders";
import { updateOrderStatus } from "@/lib/rozetka/update-order-status";
import { sendNotify } from "@/lib/send-notify";
import { sendMessage } from "@/lib/telegram/send-message";
import { IOrder } from "@/lib/types/rozetka";
import { create } from "zustand";

interface PollingState {
  orders: IOrder[];
  sentOrderIds: Set<number>;
  isPolling: boolean;

  setOrders: (orders: IOrder[]) => void;
  fetchNewOrders: () => Promise<{ orders: IOrder[]; success: boolean }>;

  startPolling: () => void;
  stopPolling: () => void;
}

let intervalId = null as NodeJS.Timeout | null;

const getSmallOrders = (orders: IOrder[]) => {
  return orders.filter((order) => +order.amount <= 100);
};

const differenceByKey = <T, K extends keyof T>(
  arr1: T[],
  arr2: T[],
  key: K,
): T[] => {
  const set2 = new Set(arr2.map((item) => item[key]));
  return arr1.filter((item) => !set2.has(item[key]));
};

const usePollingStore = create<PollingState>((set, get) => ({
  orders: [],
  sentOrderIds: new Set([]),
  isPolling: false,

  setOrders: (orders: IOrder[]) => set({ orders }),
  fetchNewOrders: async () => {
    const { orders, success } = await getNewOrders();
    if (!success) return { orders: [], success };

    set({ orders });
    return { orders, success };
  },

  startPolling: () => {
    if (intervalId) return;

    const pollingOrders = async () => {
      const data = await getNewOrders();
      const uniqueOrders = differenceByKey(data.orders, get().orders, "id");

      const { success } = await get().fetchNewOrders();
      if (!success || !data.success) return get().stopPolling();

      // Кинуть в обработку заказы до 100 грн
      const smallOrders = getSmallOrders(data.orders);
      await updateOrderStatus({ orders: smallOrders });

      // Отправить уведомление в браузере
      sendNotify(uniqueOrders);

      if (uniqueOrders.length > 0) {
        const msg = uniqueOrders.map((order) => {
          const link = `${LINKS.rozetka.new}?page=1&sort=-id&pageSize=50&id=${order.id}`;
          return `<a href="${link}">№${order.id} ${order.recipient_title.full_name} - ${order.amount}</a>`;
        });

        await sendMessage({
          message: msg.join("\n"),
          chatIds: [...config.BOT_OWNER_IDS],
        });
      }
    };

    const initialStart = [pollingOrders];
    initialStart.forEach((fn) => fn());

    intervalId = setInterval(() => {
      pollingOrders();
    }, config.ROZETKA_FETCH_INTERVAL);
    set({ isPolling: true });
  },

  stopPolling: () => {
    if (intervalId) clearInterval(intervalId);
    set({ isPolling: false });
    intervalId = null;
  },
}));

export default usePollingStore;
