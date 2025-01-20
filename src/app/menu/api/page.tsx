"use client";

import { List } from "@/components/shared/list";
import { Button } from "@/components/ui/button";
import { getNewOrders } from "@/lib/rozetka/get-new-orders";
import { setStatus } from "@/lib/rozetka/set-status";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const Page = () => {
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleHandler = () => {
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(
        async () => {
          const { orders } = await getNewOrders();

          if (orders.length === 0) return;

          Notification.requestPermission().then((result) => {
            if (result === "granted") {
              const notification = new Notification("Новый заказ");
              notification.onclick = () => {
                window.open(
                  `https://seller.rozetka.com.ua/main/orders/all?page=1&sort=-id&pageSize=50&id=${orders[0].id}&types=1`,
                );
              };
            }
          });
        },
        10 * 60 * 1000,
      );
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  return (
    <List>
      <div className="flex gap-2">
        <Button onClick={setStatus}>Кинуть в обработку</Button>
        <Button
          onClick={toggleHandler}
          className={twMerge(isActive && "bg-green-500")}
        >
          Проверять новые заказы
          {isActive ? " ON" : " OFF"}
        </Button>
      </div>
    </List>
  );
};

export default Page;
