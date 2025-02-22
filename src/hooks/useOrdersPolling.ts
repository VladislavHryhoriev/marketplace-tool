import { config } from "@/config";
import { LINKS } from "@/consts/LINKS";
import { getNewOrders } from "@/lib/rozetka/get-new-orders";
import { updateOrderStatus } from "@/lib/rozetka/update-order-status";
import { sendNotify } from "@/lib/send-notify";
import { sendMessage } from "@/lib/telegram/send-message";
import { IOrder } from "@/lib/types/rozetka";
import useGlobalStore from "@/store/globalStore";
import useNotificationStore from "@/store/notificationStore";
import usePollingStore from "@/store/pollingStore";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const getSmallOrders = (orders: IOrder[]) => {
  return orders.filter((order) => +order.amount <= 100);
};

export const useOrdersPolling = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startPolling = usePollingStore((state) => state.startPolling);
  const stopPolling = usePollingStore((state) => state.stopPolling);
  const isPolling = usePollingStore((state) => state.isPolling);
  const togglePolling = usePollingStore((state) => state.togglePolling);

  const setOrders = useGlobalStore((state) => state.setOrders);
  const isFindNewOrders = useGlobalStore((state) => state.isFindNewOrders);
  const setIsFindNewOrders = useGlobalStore(
    (state) => state.setIsFindNewOrders,
  );
  const notificationIds = useNotificationStore(
    (state) => state.notificationIds,
  );
  const addNotificationId = useNotificationStore(
    (state) => state.addNotificationId,
  );

  // useEffect(() => {
  //   isPolling ? startPolling() : stopPolling();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isPolling]);

  // const s =
  useEffect(() => {
    if (isFindNewOrders) {
      intervalRef.current = setInterval(async () => {
        const { orders: newOrders, success } = await getNewOrders();
        setOrders(newOrders);
        if (!success) {
          setIsFindNewOrders(false);
          return toast.error("Ошибка получения заказов");
        }

        const uniqueOrders = newOrders.filter(
          (order) => !notificationIds.has(order.id),
        );

        if (uniqueOrders.length === 0) {
          console.log("Нет новых заказов");
          return;
        }

        // Кинуть в обработку заказы до 100 грн
        const smallOrders = getSmallOrders(newOrders);
        await updateOrderStatus({ orders: smallOrders });

        uniqueOrders.forEach((order) => addNotificationId(order.id));
        sendNotify(uniqueOrders);

        const msg = uniqueOrders.map((order) => {
          const link = `${LINKS.rozetka.new}?page=1&sort=-id&pageSize=50&id=${order.id}`;
          return `<a href="${link}">№${order.id} ${order.recipient_title.full_name} - ${order.amount}</a>`;
        }, "");

        await sendMessage({
          message: msg.join("\n"),
          chatId: config.BOT_OWNER_ID,
        });
      }, config.ROZETKA_FETCH_INTERVAL); /// TIMER
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [
    addNotificationId,
    isFindNewOrders,
    notificationIds,
    setIsFindNewOrders,
    setOrders,
  ]);

  return { togglePolling, isPolling };
};
