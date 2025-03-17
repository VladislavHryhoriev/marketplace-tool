"use client";
import PollingOrdersButton from "@/components/shared/polling-orders-button";
import OrderListEpicentr from "@/components/shared/templates/order-list-epicentr";
import OrderListRozetka from "@/components/shared/templates/order-list-rozetka";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getNewOrders } from "@/lib/rozetka/get-new-orders";
import { updateOrderStatus } from "@/lib/rozetka/update-order-status";
import usePollingStore from "@/store/pollingStore";

const handleClick = async () => {
  const { orders, token } = await getNewOrders();
  await updateOrderStatus({ orders, token, status: 26 });
};

const MainPage = () => {
  const maxSum = usePollingStore((state) => state.maxSum);
  const setMaxSum = usePollingStore((state) => state.setMaxSum);
  const ordersRozetka = usePollingStore((state) => state.ordersRozetka);
  const ordersEpicentr = usePollingStore((state) => state.ordersEpicentr);

  return (
    <div>
      <div className="flex gap-2">
        <Button onClick={handleClick}>Кинуть в обработку</Button>
        <div className="flex items-center gap-2">
          <PollingOrdersButton />
          <label htmlFor="maxSum">Сумма: </label>
          <Input
            id="maxSum"
            value={maxSum}
            autoComplete="off"
            onChange={(e) => setMaxSum(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <OrderListRozetka orders={ordersRozetka} />
        <OrderListEpicentr orders={ordersEpicentr} />
      </div>
    </div>
  );
};

export default MainPage;
