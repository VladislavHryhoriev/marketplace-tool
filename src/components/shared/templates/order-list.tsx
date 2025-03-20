import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

const colorMapBg = { emerald: "bg-emerald-500", blue: "bg-blue-500" };
const colorMapText = { emerald: "text-emerald-400", blue: "text-blue-400" };

const OrderList = ({ title, count, orders, color }: OrderListProps) => {
  return (
    <Card className="flex w-full flex-col rounded-xl border-zinc-700 bg-zinc-800/80">
      <CardHeader className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-medium text-zinc-100">
          <span className={`size-2 rounded-full ${colorMapBg[color]}`} />
          {title}
        </h2>
        <span
          className={`${colorMapText[color]} rounded-full bg-zinc-700/70 px-3 py-1 text-sm`}
        >
          {count} заказов
        </span>
      </CardHeader>
      <CardContent className="h-[70vh] overflow-y-auto">
        <ul className="grid grid-cols-1 gap-2">
          {orders.map((order) => (
            <li key={order.id}>
              <Link
                href={order.link}
                target="_blank"
                className="group flex items-center gap-4 rounded-lg bg-zinc-700/40 p-3 transition-all hover:bg-zinc-700/60"
              >
                <div className="flex-1">
                  <p className="truncate text-sm font-medium text-zinc-100">
                    {order.fullName}
                    <span className="text-xs text-zinc-400">
                      ({order.number || order.id})
                    </span>
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${colorMapText[color]}`}
                    >
                      {order.amount}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {order.photos.length} товаров
                    </span>
                    <div className="flex gap-2">
                      {order.photos.map((photo) => (
                        <div
                          key={photo.alt}
                          className="size-5 overflow-hidden rounded-md"
                        >
                          <Image
                            src={photo.url}
                            alt={photo.alt}
                            width={30}
                            height={30}
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default OrderList;
