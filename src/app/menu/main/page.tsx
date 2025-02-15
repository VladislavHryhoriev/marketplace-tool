"use client";

import { List } from "@/components/shared/list";
import OrderList from "@/components/shared/templates/order-list";
import { Button } from "@/components/ui/button";
import { useNewOrdersPolling } from "@/hooks/useNewOrdersPolling";
import { getNewOrders } from "@/lib/rozetka/get-new-orders";
import { updateOrderStatus } from "@/lib/rozetka/update-order-status";
import { cn } from "@/lib/utils";

const Page = () => {
  const { isFindNewOrders, setIsFindNewOrders, orders } = useNewOrdersPolling();

  const handleClick = async () => {
    const { orders, token } = await getNewOrders();
    await updateOrderStatus({ orders, token });
  };

  return (
    <List>
      <div className="flex gap-2">
        <Button onClick={handleClick}>Кинуть в обработку</Button>
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
