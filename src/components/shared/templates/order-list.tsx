import { IOrder } from "@/lib/types/rozetka";
import Image from "next/image";
import Link from "next/link";

const OrderList = ({ title, orders }: { title: string; orders: IOrder[] }) => {
  return (
    <div className="mt-4 p-2">
      <h2>{title}</h2>
      <ul className="mt-2 grid grid-cols-1 gap-2">
        {orders.map((order) => (
          <li key={order.id}>
            <Link
              href={`https://seller.rozetka.com.ua/main/orders/all?page=1&sort=-id&pageSize=50&id=${order.id}&types=1`}
              target="_blank"
              className="grid grid-cols-4 rounded bg-indigo-500 p-2 hover:underline"
            >
              <span>№{order.id}</span>
              <span>{order.recipient_title.full_name}</span>
              <span>{order.amount}</span>
              <div className="grid grid-cols-6 gap-2">
                {order.items_photos.map((photo) => (
                  <Image
                    key={photo.url}
                    src={photo.url}
                    alt={order.recipient_title.full_name}
                    width={50}
                    height={50}
                  />
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
