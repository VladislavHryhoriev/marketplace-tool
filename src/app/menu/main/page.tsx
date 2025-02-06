"use client";

import { List } from "@/components/shared/list";
import OrderList from "@/components/shared/templates/order-list";
import { Button } from "@/components/ui/button";
import { useNewOrdersPolling } from "@/hooks/useNewOrdersPolling";
import { updateOrderStatus } from "@/lib/rozetka/set-status";
import { cn } from "@/lib/utils";
import { useGlobalStore } from "@/store/store";

const Page = () => {
  const { isFindNewOrders, setIsFindNewOrders } = useNewOrdersPolling();
  const orders = useGlobalStore((state) => state.orders);

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
