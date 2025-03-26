"use client";
import rozetkaApi from "@/clients/rozetka/api";
import PollingOrdersButton from "@/components/shared/polling-orders-button";
import OrderListEpicentr from "@/components/shared/templates/order-list-epicentr";
import OrderListRozetka from "@/components/shared/templates/order-list-rozetka";
import { Button } from "@/components/ui/button";
import usePollingStore from "@/store/pollingStore";

const MainPage = () => {
  const ordersRozetka = usePollingStore((state) => state.ordersRozetka);
  const ordersEpicentr = usePollingStore((state) => state.ordersEpicentr);

  // TODO: Сбросить список после обновления статуса

  const handleClick = async () => {
    const { orders } = await rozetkaApi.getNewOrders();
    await rozetkaApi.updateOrderStatus({ orders, status: 26 });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button onClick={handleClick}>Кинуть в обработку</Button>
        <PollingOrdersButton />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <OrderListRozetka orders={ordersRozetka} />
        <OrderListEpicentr orders={ordersEpicentr} />
      </div>
    </div>
  );
};

export default MainPage;
