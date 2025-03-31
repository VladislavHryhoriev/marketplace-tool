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
}

let intervalPollingId = null as NodeJS.Timeout | null;
let intervalProgressId = null as NodeJS.Timeout | null;

const step = 100 / (config.fetchInterval / config.interval);

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
      try {
        const { orders: newOrdersRozetka, success } =
          await rozetkaApi.getOrdersByType(config.rozetka.searchType);
        const { items: newOrdersEpicentr } = await epicentrApi.fetchOrders(
          config.epicentr.searchType,
        );

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

        // Кинуть в обработку заказы до 100 грн
        if (useUserConfigStore.getState().notifications.sendToProcess) {
          await rozetkaApi.updateOrderStatus({
            orders: get().getSmallOrdersRozetka(newOrdersRozetka),
          });
        }

        if (uniqueOrdersRozetka.length > 0 || uniqueOrdersEpicentr.length > 0) {
          if (useUserConfigStore.getState().notifications.browser) {
            sendBrowserNotification(uniqueOrdersRozetka); // Отправить уведомление в браузере
          }

          const rozetkaCount =
            get().getSmallOrdersRozetka(newOrdersRozetka).length;
          const epicentrCount =
            get().getSmallOrdersEpicentr(newOrdersEpicentr).length;

          if (rozetkaCount > 0 || epicentrCount > 0) {
            const messageOwner = createMessage(
              get().getSmallOrdersRozetka(newOrdersRozetka),
              get().getSmallOrdersEpicentr(newOrdersEpicentr),
            );

            if (useUserConfigStore.getState().notifications.telegram) {
              await sendMessage([
                { id: config.botUserIds.owner, message: messageOwner },
              ]);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    const progress = () => {
      if (get().progress < 100) {
        set((prev) => ({ progress: prev.progress + step }));
      } else {
        set({ progress: 0 });
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

  resetOrders: () => {
    set({ ordersRozetka: [], ordersEpicentr: [] });
  },
}));

export default usePollingStore;
