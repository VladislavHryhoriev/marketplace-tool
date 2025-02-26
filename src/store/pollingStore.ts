import { config } from "@/config";
import { LINKS } from "@/consts/LINKS";
import { differenceByKey } from "@/lib/difference-by-key";
import { getNewOrders } from "@/lib/rozetka/get-new-orders";
import { updateOrderStatus } from "@/lib/rozetka/update-order-status";
import { sendBrowserNotification } from "@/lib/send-browser-notification";
import { sendMessage } from "@/lib/telegram/send-message";
import { IOrder } from "@/lib/types/rozetka";
import { create } from "zustand";

interface PollingState {
  orders: IOrder[];
  isPolling: boolean;
  maxSum: number;

  setMaxSum: (maxSum: string) => void;

  getSmallOrders: (orders: IOrder[]) => IOrder[];

  startPolling: () => void;
  stopPolling: () => void;
}

let intervalId = null as NodeJS.Timeout | null;

const createMessage = (orders: IOrder[]) => {
  const message = orders
    .map((order) => {
      const link = `${LINKS.rozetka.new}?page=1&sort=-id&pageSize=50&id=${order.id}`;
      return `<a href="${link}">№${order.id} ${order.recipient_title.full_name} - ${order.amount}</a>`;
    })
    .join("\n");
  return message;
};

const usePollingStore = create<PollingState>((set, get) => ({
  orders: [],
  isPolling: false,
  maxSum: 100,

  setMaxSum: (maxSum: string) => {
    set({ orders: [] });
    set(() => {
      const numbersOnly = +maxSum.replace(/[^0-9]/g, "");
      return { maxSum: numbersOnly };
    });
  },

  getSmallOrders: (orders: IOrder[]) => {
    return orders.filter((order) => +order.amount <= get().maxSum);
  },

  startPolling: () => {
    if (intervalId) return;

    const pollingOrders = async () => {
      try {
        const { orders, success } = await getNewOrders();
        if (!success) {
          get().stopPolling();
          return { orders: [], success };
        }

        const uniqueOrders = differenceByKey(orders, get().orders, "id");

        set({ orders });

        // Кинуть в обработку заказы до 100 грн
        await updateOrderStatus({ orders: get().getSmallOrders(orders) });

        if (uniqueOrders.length > 0) {
          sendBrowserNotification(uniqueOrders); // Отправить уведомление в браузере

          await sendMessage([
            {
              id: config.BOT_USER_IDS.owner,
              message: createMessage(get().getSmallOrders(orders)),
            },
            {
              id: config.BOT_USER_IDS.ukrstore,
              message: createMessage(orders),
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const initialStart = [pollingOrders];
    initialStart.forEach((fn) => fn());

    intervalId = setInterval(pollingOrders, config.ROZETKA_FETCH_INTERVAL);
    set({ isPolling: true });
  },

  stopPolling: () => {
    if (intervalId) clearInterval(intervalId);
    set({ isPolling: false });
    intervalId = null;
  },
}));

export default usePollingStore;
