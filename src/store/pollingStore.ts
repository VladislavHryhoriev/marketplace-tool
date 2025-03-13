import epicentrApi from "@/clients/epicentr/api";
import { Order } from "@/clients/epicentr/types";
import { config } from "@/config";
import LINKS from "@/consts/LINKS";
import { differenceByKey } from "@/lib/difference-by-key";
import { getNewOrders } from "@/lib/rozetka/get-new-orders";
import { updateOrderStatus } from "@/lib/rozetka/update-order-status";
import { sendBrowserNotification } from "@/lib/send-browser-notification";
import { sendMessage } from "@/lib/telegram/send-message";
import { IOrder } from "@/lib/types/rozetka";
import { create } from "zustand";

interface PollingState {
  ordersRozetka: IOrder[];
  ordersEpicentr: Order[];
  isPolling: boolean;
  maxSum: number;

  setMaxSum: (maxSum: string) => void;

  getSmallOrdersRozetka: (orders: IOrder[]) => IOrder[];
  getSmallOrdersEpicentr: (orders: Order[]) => Order[];

  startPolling: () => void;
  stopPolling: () => void;
}

let intervalId = null as NodeJS.Timeout | null;

const createMessage = (ordersRozetka: IOrder[], ordersEpicentr: Order[]) => {
  const messageRozetka = ordersRozetka
    .map((order) => {
      const link = `${LINKS.rozetka.new}?page=1&sort=-id&pageSize=50&id=${order.id}`;
      return `<a href="${link}">№${order.id} ${order.recipient_title.full_name} - ${order.amount}</a>`;
    })
    .join("\n");

  const messageEpicentr = ordersEpicentr
    .map((order) => {
      const link = `https://admin.epicentrm.com.ua/oms/orders/${order.id}`;
      const fullName = `${order.address.lastName} ${order.address.firstName} ${order.address.patronymic}`;
      return `<a href="${link}">№${order.number} ${fullName} - ${order.subtotal}</a>`;
    })
    .join("\n");

  const message = `Розетка:\n${messageRozetka}\n\nЭпицентр:\n${messageEpicentr}`;

  return message;
};

const usePollingStore = create<PollingState>((set, get) => ({
  ordersRozetka: [],
  ordersEpicentr: [],
  isPolling: false,
  maxSum: 100,

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
    if (intervalId) return;

    const pollingOrders = async () => {
      try {
        const { orders: newOrdersRozetka, success } = await getNewOrders();
        const { items: newOrdersEpicentr } = await epicentrApi.fetchOrders(
          "confirmed_by_merchant",
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

        set({ ordersEpicentr: newOrdersEpicentr });
        set({ ordersRozetka: newOrdersRozetka });

        // Кинуть в обработку заказы до 100 грн
        await updateOrderStatus({
          orders: get().getSmallOrdersRozetka(newOrdersRozetka),
        });

        if (uniqueOrdersRozetka.length > 0 || uniqueOrdersEpicentr.length > 0) {
          sendBrowserNotification(uniqueOrdersRozetka); // Отправить уведомление в браузере

          const rozetkaCount =
            get().getSmallOrdersRozetka(newOrdersRozetka).length;
          const epicentrCount =
            get().getSmallOrdersEpicentr(newOrdersEpicentr).length;

          if (rozetkaCount > 0 || epicentrCount > 0) {
            const messageOwner = createMessage(
              get().getSmallOrdersRozetka(newOrdersRozetka),
              get().getSmallOrdersEpicentr(newOrdersEpicentr),
            );

            await sendMessage([
              {
                id: config.BOT_USER_IDS.owner,
                message: messageOwner,
              },
            ]);
          }
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
