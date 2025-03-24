import { Order } from "@/clients/epicentr/types";
import OrderList from "./order-list";
import usePollingStore from "@/store/pollingStore";

const OrderListEpicentr = ({ orders }: { orders: Order[] }) => {
  const maxSum = usePollingStore((state) => state.maxSum);

  const formattedOrders = orders.map((order) => ({
    id: order.id,
    number: order.number,
    recipient: {
      phone: order.address.phone || "",
      name: `${order.address.lastName} ${order.address.patronymic}`,
    },
    user: {
      phone: order.address.phone || "",
      name: `${order.address.firstName} ${order.address.lastName} ${order.address.patronymic}`,
    },
    amount: order.subtotal,
    photos: order.items.map((item) => ({
      url: item.image || "",
      alt: item.title,
    })),
    link: `https://admin.epicentrm.com.ua/oms/orders/${order.id}`,
  }));

  const smallOrders = formattedOrders.filter(
    (order) => +order.amount <= maxSum,
  );

  return (
    <OrderList
      title="Эпицентр"
      count={orders.length}
      orders={formattedOrders}
      smallOrders={smallOrders}
      color="blue"
    />
  );
};

export default OrderListEpicentr;
