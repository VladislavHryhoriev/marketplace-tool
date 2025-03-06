"use client";
import { List } from "@/components/shared/list";
import PollingOrdersButton from "@/components/shared/polling-orders-button";
import OrderList from "@/components/shared/templates/order-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getNewOrders } from "@/lib/rozetka/get-new-orders";
import { updateOrderStatus } from "@/lib/rozetka/update-order-status";
import usePollingStore from "@/store/pollingStore";

const handleClick = async () => {
  const { orders, token } = await getNewOrders();
  await updateOrderStatus({ orders, token, status: 26 });
};

const Page = () => {
  const maxSum = usePollingStore((state) => state.maxSum);
  const setMaxSum = usePollingStore((state) => state.setMaxSum);
  const orders = usePollingStore((state) => state.ordersRozetka);

  return (
    <List>
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
      <OrderList title="Новые заказы Розетка" orders={orders} />
      {/* <OrderList title="Новые заказы Розетка" /> */}
    </List>
  );
};

export default Page;
