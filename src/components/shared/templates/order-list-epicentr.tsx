import { Order } from "@/clients/epicentr/types";
import { Circle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const OrderListEpicentr = ({ orders }: { orders: Order[] }) => {
  return (
    <div className="mt-4 p-2">
      <h2 className="flex items-center gap-2">
        <Circle className="text-blue-500" />
        Эпицентр: {orders.length}шт
      </h2>
      <ul className="mt-2 grid grid-cols-1 gap-2">
        {orders.map((order) => (
          <li key={order.id}>
            <Link
              href={`https://admin.epicentrm.com.ua/oms/orders/${order.id}`}
              target="_blank"
              className="grid grid-cols-4 rounded bg-indigo-500 p-2 hover:underline"
            >
              <span>№{order.number}</span>
              <span>{`${order.address.firstName} ${order.address.lastName} ${order.address.patronymic}`}</span>
              <span>{order.subtotal}</span>
              <div className="grid grid-cols-6 gap-2">
                {order.items.map((photo) => (
                  <Image
                    key={photo.url}
                    src={photo.image || ""}
                    alt={photo.title}
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

export default OrderListEpicentr;
