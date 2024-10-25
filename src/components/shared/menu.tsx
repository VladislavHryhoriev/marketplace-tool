"use client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

interface Props {
  className?: string;
}

const routes = [
  {
    title: "API",
    path: "/rozetka-api",
  },
  {
    title: "Шаблоны",
    path: "/templates",
  },
];

export const Menu = ({ className }: Props) => {
  const [activePath, setActivePath] = useState("/rozetka-api");

  return (
    <div className={className}>
      <ul className="flex">
        {routes.map((route) => (
          <li
            key={route.path}
            className="overflow-hidden first:rounded-tl-lg last:rounded-tr-lg"
          >
            <Link
              className={clsx(
                "min-w-20 p-2 text-center",
                activePath === route.path
                  ? "bg-orange-500"
                  : "bg-zinc-600 hover:bg-zinc-500",
              )}
              href={route.path}
              onClick={() => setActivePath(route.path)}
            >
              {route.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
