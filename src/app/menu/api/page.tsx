"use client";

import { List } from "@/components/shared/list";
import OrderList from "@/components/shared/templates/order-list";
import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { LINKS } from "@/constants";
import { getNewOrders } from "@/lib/rozetka/get-new-orders";
import { updateOrderStatus } from "@/lib/rozetka/set-status";
import { sendMessage } from "@/lib/telegram/send-message";
import { IOrder } from "@/lib/types/rozetka";
import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/store/store";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const sendNotify = async (orders: IOrder[]) => {
  if (orders.length === 0) return;

  if (Notification.permission !== "granted") {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Уведомления запрещены пользователем");
      return;
    }
  }

  const notification = new Notification(`Новых: ${orders.length}шт`, {
    body: orders.reduce(
      (acc, order) =>
        `${acc}\n${order.recipient_title.full_name} - ${order.amount}`,
      "",
    ),
  });

  notification.onclick = () => {
    window.open(`${LINKS.rozetka.new}?page=1&sort=-id&pageSize=50&types=4`);
  };
};

const Page = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const orders = useGlobalStore((state) => state.orders);
  const setOrders = useGlobalStore((state) => state.setOrders);
  const isFindNewOrders = useGlobalStore((state) => state.isFindNewOrders);
  const setIsFindNewOrders = useGlobalStore(
    (state) => state.setIsFindNewOrders,
  );
  const notifiedOrdersIds = useGlobalStore((state) => state.notifiedOrdersIds);
  const addNotifiedOrderId = useGlobalStore(
    (state) => state.addNotifiedOrderId,
  );

  useEffect(() => {
    if (isFindNewOrders) {
      intervalRef.current = setInterval(async () => {
        const { orders: newOrders, success } = await getNewOrders();

        if (!success) {
          setIsFindNewOrders(false);
          return toast.error("Ошибка получения заказов");
        }

        const uniqueOrders = newOrders.filter(
          (order) => !notifiedOrdersIds.includes(order.id),
        );

        if (uniqueOrders.length === 0) return;

        uniqueOrders.forEach((order) => addNotifiedOrderId(order.id));
        sendNotify(uniqueOrders);

        const msg = uniqueOrders.map((order) => {
          const link = `${LINKS.rozetka.new}?page=1&sort=-id&pageSize=50&id=${order.id}`;
          return `<a href="${link}">№${order.id} ${order.recipient_title.full_name} - ${order.amount}</a>`;
        }, "");

        await sendMessage({
          message: msg.join("\n"),
          chatId: config.BOT_OWNER_ID,
        });

        setOrders(newOrders);
      }, config.ROZETKA_FETCH_INTERVAL); /// TIMER
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFindNewOrders, notifiedOrdersIds]);

  return (
    <List>
      <div className="flex gap-2">
        <Button onClick={updateOrderStatus}>Кинуть в обработку</Button>
        <Button
          onClick={() => setIsFindNewOrders(!isFindNewOrders)}
          className={cn(isFindNewOrders && "bg-green-500")}
        >
          Проверять новые заказы {isFindNewOrders ? "ON" : "OFF"}
        </Button>
      </div>
      <OrderList title="Новые заказы Розетка" orders={orders} />
    </List>
  );
};

export default Page;
