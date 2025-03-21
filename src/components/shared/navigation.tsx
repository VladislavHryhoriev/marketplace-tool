import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ROUTES } from "@/config";
import { cn } from "@/lib/utils";
import useGlobalStore from "@/store/globalStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
export const Navigation = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);

  const isOpenMenu = useGlobalStore((state) => state.isOpenMenu);
  const setIsOpenMenu = useGlobalStore((state) => state.setIsOpenMenu);

  const handleClick = (path: string) => {
    setIsOpenMenu(!isOpenMenu);
    setActivePath(path);
  };

  return (
    <>
      {/* Мобильная кнопка меню */}
      <Sheet open={isOpenMenu} onOpenChange={setIsOpenMenu}>
        <SheetContent
          side="left"
          className="w-screen bg-zinc-800/95 p-0 md:w-[250px]"
        >
          <SheetHeader className="border-b border-zinc-700 p-4">
            <SheetTitle className="text-lg font-semibold text-zinc-100">
              Меню
            </SheetTitle>
          </SheetHeader>
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {ROUTES.map((route) => (
                <li key={route.path}>
                  <Link
                    className={cn(
                      "block rounded-md px-3 py-2 text-center text-xl font-medium transition-colors sm:text-left md:text-sm",
                      activePath === route.path
                        ? "bg-indigo-500 text-zinc-100"
                        : "text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-100",
                    )}
                    href={route.path}
                    onClick={() => handleClick(route.path)}
                  >
                    {route.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Десктопное меню */}
      <div
        className={cn(
          "hidden h-full w-[200px] flex-col justify-between bg-zinc-800/80 px-2 py-4 md:flex",
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
    </>
  );
};
