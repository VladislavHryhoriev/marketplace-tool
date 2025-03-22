import { IOrder } from "@/lib/types/rozetka";
import OrderList from "./order-list";

const OrderListRozetka = ({ orders }: { orders: IOrder[] }) => {
  const formattedOrders = orders.map((order) => ({
    id: order.id,
    recipient: {
      phone: order.recipient_phone,
      name: order.recipient_title.full_name,
    },
    user: {
      phone: order.user_phone,
      name: order.user_title.full_name,
    },
    amount: order.amount,
    photos: order.items_photos.map((photo) => ({
      url: photo.url,
      alt: photo.item_name,
    })),
    link: `https://seller.rozetka.com.ua/main/orders/all?page=1&sort=-id&pageSize=50&id=${order.id}&types=1`,
  }));

  return (
    <OrderList
      title="Розетка"
      count={orders.length}
      orders={formattedOrders}
      color="emerald"
    />
  );
};

export default OrderListRozetka;
