import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type OrderItem = {
  id: string | number;
  number?: string;
  fullName: string;
  amount: string | number;
  photos: Array<{ url: string; alt: string }>;
  link: string;
};

type OrderListProps = {
  title: string;
  count: number;
  orders: OrderItem[];
  color: "emerald" | "blue";
};

const OrderList = ({ title, count, orders, color }: OrderListProps) => {
  return (
    <div className="mt-6 rounded-xl bg-zinc-900/80 p-4 ring ring-zinc-800/50">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-medium text-zinc-100">
          <span className={`size-2 rounded-full bg-${color}-500`} /> {title}
        </h2>
        <span className="rounded-full bg-zinc-800/80 px-3 py-1 text-sm text-zinc-300">
          {count} заказов
        </span>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        <ul className="grid grid-cols-1 gap-2">
          {orders.map((order) => (
            <li key={order.id}>
              <Link
                href={order.link}
                target="_blank"
                className="group flex items-center gap-4 rounded-lg bg-zinc-800/80 p-3 transition-all hover:bg-zinc-800"
              >
                <div className="flex items-center justify-center rounded-md bg-zinc-900/80 p-2 font-medium text-zinc-200 ring-1 ring-zinc-700/50">
                  #{order.number || order.id}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-100">
                    {order.fullName}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={cn("text-sm font-medium", {
                        "text-emerald-400": color === "emerald",
                        "text-blue-400": color === "blue",
                      })}
                    >
                      {order.amount}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {order.photos.length} товаров
                    </span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {order.photos.map((photo) => (
                    <div
                      key={photo.url}
                      className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-zinc-900/80 ring-1 ring-zinc-700/50 transition-transform group-hover:scale-105"
                    >
                      <Image
                        src={photo.url}
                        alt={photo.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderList;
