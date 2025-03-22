import { Order } from "@/clients/epicentr/types";
import OrderList from "./order-list";

const OrderListEpicentr = ({ orders }: { orders: Order[] }) => {
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

  return (
    <OrderList
      title="Эпицентр"
      count={orders.length}
      orders={formattedOrders}
      color="blue"
    />
  );
};

export default OrderListEpicentr;
