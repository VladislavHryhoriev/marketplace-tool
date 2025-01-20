"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
  className?: string;
}

const routes = [
  {
    title: "API",
    path: "/menu/api",
  },
  {
    title: "Шаблоны",
    path: "/menu/templates",
  },
];

export const Tabs = ({ className }: Props) => {
  const path = usePathname();
  const [activePath, setActivePath] = useState(path);

  return (
    <div className={cn("border-b-2 border-indigo-500", className)}>
      <ul className="grid max-w-fit grid-cols-2 overflow-hidden rounded-t-md">
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              className={cn(
                "bg-zinc-700 px-3 py-1 text-center transition-colors",
                activePath === route.path && "bg-indigo-500",
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
