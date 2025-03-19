"use client";
import PollingOrdersButton from "@/components/shared/polling-orders-button";
import OrderListEpicentr from "@/components/shared/templates/order-list-epicentr";
import OrderListRozetka from "@/components/shared/templates/order-list-rozetka";
import { Button } from "@/components/ui/button";
import { getNewOrders } from "@/lib/rozetka/get-new-orders";
import { updateOrderStatus } from "@/lib/rozetka/update-order-status";
import usePollingStore from "@/store/pollingStore";

const handleClick = async () => {
  const { orders, token } = await getNewOrders();
  await updateOrderStatus({ orders, token, status: 26 });
};

const MainPage = () => {
  const ordersRozetka = usePollingStore((state) => state.ordersRozetka);
  const ordersEpicentr = usePollingStore((state) => state.ordersEpicentr);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
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
