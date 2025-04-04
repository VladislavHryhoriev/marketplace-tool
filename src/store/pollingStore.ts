import epicentrApi from "@/clients/epicentr/api";
import { Order } from "@/clients/epicentr/types";
import rozetkaApi from "@/clients/rozetka/api";
import { IOrder } from "@/clients/rozetka/types";
import { config } from "@/config";
import { differenceByKey } from "@/lib/difference-by-key";
import { sendBrowserNotification } from "@/lib/send-browser-notification";
import { createMessage } from "@/lib/telegram/create-message";
import { sendMessage } from "@/lib/telegram/send-message";
import { create } from "zustand";
import useUserConfigStore from "./userConfigStore";
import { toast } from "react-toastify";

interface State {
  ordersRozetka: IOrder[];
  ordersEpicentr: Order[];
  isPolling: boolean;
  maxSum: number;
  progress: number;
}

interface Actions {
  setMaxSum: (maxSum: string) => void;
  getSmallOrdersRozetka: (orders: IOrder[]) => IOrder[];
  getSmallOrdersEpicentr: (orders: Order[]) => Order[];
  startPolling: () => void;
  stopPolling: () => void;
  resetOrders: () => void;
  restartPolling: () => void;
}

let intervalPollingId = null as NodeJS.Timeout | null;
let intervalProgressId = null as NodeJS.Timeout | null;

const step = 100 / (config.fetchInterval / config.interval);

const fetchData = async () => {
  const { orders: newOrdersRozetka, success } =
    await rozetkaApi.getOrdersByType(
      useUserConfigStore.getState().market.rozetkaSearchType,
    );

  const { items: newOrdersEpicentr } = await epicentrApi.fetchOrders(
    useUserConfigStore.getState().market.epicenterSearchType,
  );

  return { newOrdersRozetka, newOrdersEpicentr, success };
};

const initialState: State = {
  ordersRozetka: [],
  ordersEpicentr: [],
  isPolling: false,
  maxSum: 100,
  progress: 0,
};

const usePollingStore = create<State & Actions>((set, get) => ({
  ...initialState,
  setMaxSum: (maxSum: string) => {
    set({
      isPolling: false,
      ordersRozetka: [],
      ordersEpicentr: [],
      maxSum: +maxSum.replace(/[^0-9]/g, ""),
    });
  },

  getSmallOrdersRozetka: (orders: IOrder[]) => {
    return orders.filter((order) => +order.amount <= get().maxSum);
  },

  getSmallOrdersEpicentr: (orders: Order[]) => {
    return orders.filter((order) => order.subtotal <= get().maxSum);
  },

  startPolling: () => {
    if (intervalPollingId) return;

    const pollingOrders = async () => {
      const { browser, telegram } = useUserConfigStore.getState().notifications;
      const { sendToProcess } = useUserConfigStore.getState().orders;

      try {
        const { newOrdersRozetka, newOrdersEpicentr, success } =
          await fetchData();

        if (!success) {
          get().stopPolling();
          return { ordersRozetka: [], success };
        }

        const uniqueOrdersRozetka = differenceByKey(
          newOrdersRozetka,
          get().ordersRozetka,
          "id",
        );
        const uniqueOrdersEpicentr = differenceByKey(
          newOrdersEpicentr,
          get().ordersEpicentr,
          "id",
        );

        set({
          ordersEpicentr: newOrdersEpicentr,
          ordersRozetka: newOrdersRozetka,
        });

        const smallRozetka = get().getSmallOrdersRozetka(newOrdersRozetka);
        const smallEpicentr = get().getSmallOrdersEpicentr(newOrdersEpicentr);

        // Кинуть в обработку заказы до <maxSum> грн
        if (sendToProcess) {
          await rozetkaApi.updateOrderStatus({ orders: smallRozetka });
        }

        if (uniqueOrdersRozetka.length > 0 || uniqueOrdersEpicentr.length > 0) {
          if (browser) sendBrowserNotification(uniqueOrdersRozetka); // Отправить уведомление в браузере

          if (telegram) {
            const message = await sendMessage([
              {
                id: config.botUserIds.ukrstore,
                message: createMessage([], newOrdersEpicentr),
              },
            ]);

            if (!message) {
              toast.error("Ошибка при отправке сообщения");
            }

            if (smallRozetka.length > 0 || smallEpicentr.length > 0) {
              const message = await sendMessage([
                {
                  id: config.botUserIds.owner,
                  message: createMessage(smallRozetka, smallEpicentr),
                },
              ]);

              if (!message) {
                toast.error("Ошибка при отправке сообщения");
              }
            }
          }
        }
        set({ progress: 0 });
      } catch (error) {
        console.error(error);
      }
    };

    const progress = () => {
      if (get().progress + step >= 100) {
        set({ progress: 0 });
      } else {
        set({ progress: get().progress + step });
      }
    };

    pollingOrders();
    intervalPollingId = setInterval(pollingOrders, config.fetchInterval);
    intervalProgressId = setInterval(progress, config.interval);
    set({ isPolling: true });
  },

  stopPolling: () => {
    if (intervalPollingId) clearInterval(intervalPollingId);
    if (intervalProgressId) clearInterval(intervalProgressId);
    set({ isPolling: false, progress: 0 });
    intervalPollingId = null;
    intervalProgressId = null;
  },

  restartPolling: () => {
    get().stopPolling();
    get().startPolling();
  },

  resetOrders: () => {
    set({ ordersRozetka: [], ordersEpicentr: [] });
  },
}));

export default usePollingStore;
