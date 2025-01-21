"use client";

import { List } from "@/components/shared/list";
import OrderList from "@/components/shared/templates/order-list";
import { Button } from "@/components/ui/button";
import { ROZETKA_FETCH_INTERVAL } from "@/constants";
import { getNewOrders } from "@/lib/rozetka/get-new-orders";
import { setStatus } from "@/lib/rozetka/set-status";
import { IOrder } from "@/lib/types/rozetka";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const sendNotify = async (orders: IOrder[]) => {
  if (orders.length === 0) return;
  const { id, amount, recipient_title } = orders[0];

  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      const notification = new Notification(recipient_title.full_name, {
        body: `${amount} грн`,
      });
      notification.onclick = () => {
        window.open(
          `https://seller.rozetka.com.ua/main/orders/all?page=1&sort=-id&pageSize=50&id=${id}&types=1`,
        );
      };
    }
  });
};

const Page = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(async () => {
        const { orders, success } = await getNewOrders();

        if (!success) {
          setIsActive(false);
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
  }, [isActive]);

  return (
    <List>
      <div className="flex gap-2">
        <Button onClick={setStatus}>Кинуть в обработку</Button>
        <Button
          onClick={() => setIsActive((prev) => !prev)}
          className={cn(isActive && "bg-green-500")}
        >
          Проверять новые заказы {isActive ? " ON" : " OFF"}
        </Button>
      </div>
      <OrderList title="Новые заказы Розетка" orders={orders} />
    </List>
  );
};

export default Page;
