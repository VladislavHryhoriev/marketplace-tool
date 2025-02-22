"use client";
import { List } from "@/components/shared/list";
import PollingOrdersButton from "@/components/shared/polling-orders-btn";
import TelegramOrderAlertsButton from "@/components/shared/telegram-nots-btn";
import OrderList from "@/components/shared/templates/order-list";
import { Button } from "@/components/ui/button";
import { getNewOrders } from "@/lib/rozetka/get-new-orders";
import { updateOrderStatus } from "@/lib/rozetka/update-order-status";

const Page = () => {
  const handleClick = async () => {
    const { orders, token } = await getNewOrders();
    await updateOrderStatus({ orders, token, status: 26 });
  };

  return (
    <List>
      <div className="flex gap-2">
        <Button onClick={handleClick}>Кинуть в обработку</Button>
        <PollingOrdersButton />
        <TelegramOrderAlertsButton />
      </div>
      <OrderList title="Новые заказы Розетка" />
    </List>
  );
};

export default Page;
