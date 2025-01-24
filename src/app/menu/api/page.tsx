"use client";

import { List } from "@/components/shared/list";
import OrderList from "@/components/shared/templates/order-list";
import { Button } from "@/components/ui/button";
import { ROZETKA_FETCH_INTERVAL } from "@/config";
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
      (orders, v) => `${orders}\n${v.recipient_title.full_name} - ${v.amount}`,
      "",
    ),
  });

  notification.onclick = () => {
    window.open(
      `https://seller.rozetka.com.ua/main/orders/new?page=1&sort=-id&pageSize=50&types=4`,
    );
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

  useEffect(() => {
    if (isFindNewOrders) {
      intervalRef.current = setInterval(async () => {
        const { orders, success } = await getNewOrders();

        if (!success) {
          setIsFindNewOrders(false);
          return toast.error("Ошибка получения заказов");
        }

        setOrders(orders);
        sendNotify(orders);

        const message = orders.reduce(
          (orders, v) =>
            `${orders}\n${v.recipient_title.full_name} - ${v.amount}`,
          "",
        );

        sendMessage(901615640, message);
      }, ROZETKA_FETCH_INTERVAL);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFindNewOrders]);

  return (
    <List>
      <div className="flex gap-2">
        {/* <Button onClick={sendMessage}>Кинуть в обработку</Button> */}
        <Button onClick={updateOrderStatus}>Кинуть в обработку</Button>
        <Button
          onClick={() => setIsFindNewOrders(!isFindNewOrders)}
          className={cn(isFindNewOrders && "bg-green-500")}
        >
          Проверять новые заказы {isFindNewOrders ? " ON" : " OFF"}
        </Button>
      </div>
      <OrderList title="Новые заказы Розетка" orders={orders} />
    </List>
  );
};

export default Page;
