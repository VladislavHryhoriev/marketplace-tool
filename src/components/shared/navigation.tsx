import { ROUTES } from "@/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Navigation = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);

  return (
    <div
      className={cn(
        "flex h-full w-[250px] flex-col justify-between bg-zinc-800/80 px-2 py-4",
        className,
      )}
    >
      <div>
        <div className="mb-4 px-2">
          <h2 className="text-lg font-semibold text-zinc-100">Меню</h2>
        </div>
        <nav className="flex-1">
          <ul className="space-y-1">
            {ROUTES.map((route) => (
              <li key={route.path}>
                <Link
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    activePath === route.path
                      ? "bg-indigo-500 text-zinc-100"
                      : "text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-100",
                  )}
                  href={route.path}
                  onClick={() => setActivePath(route.path)}
                >
                  {route.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
