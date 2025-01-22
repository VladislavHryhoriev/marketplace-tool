"use client";

import { List } from "@/components/shared/list";
import OrderList from "@/components/shared/templates/order-list";
import { Button } from "@/components/ui/button";
import { ROZETKA_FETCH_INTERVAL } from "@/config";
import { getNewOrders } from "@/lib/rozetka/get-new-orders";
import { updateOrderStatus } from "@/lib/rozetka/set-status";
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

  orders.forEach(({ id, amount, recipient_title }) => {
    const notification = new Notification(recipient_title.full_name, {
      body: `${amount} грн`,
    });

    notification.onclick = () => {
      window.open(
        `https://seller.rozetka.com.ua/main/orders/all?page=1&sort=-id&pageSize=50&id=${id}&types=1`,
      );
    };
  });
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
