"use client";
import Container from "@/components/shared/container";
import { Navigation } from "@/components/shared/navigation";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config";
import useGlobalStore from "@/store/globalStore";
import usePollingStore from "@/store/pollingStore";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isPolling = usePollingStore((state) => state.isPolling);
  const startPolling = usePollingStore((state) => state.startPolling);
  const stopPolling = usePollingStore((state) => state.stopPolling);
  const setIsOpenMenu = useGlobalStore((state) => state.setIsOpenMenu);
  const pathname = usePathname();

  useEffect(() => {
    isPolling ? startPolling() : stopPolling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPolling]);

  return (
    <>
      <Container className="h-svh justify-between md:flex">
        <div className="z-50 flex place-items-center gap-2 bg-zinc-800/80 px-4 py-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpenMenu(true)}
          >
            <Menu className="size-6" />
          </Button>
          <p className="text-lg font-semibold text-zinc-100">
            {ROUTES.find((route) => route.path === pathname)?.title}
          </p>
        </div>
        <Navigation />
        <div className="flex-1 overflow-y-auto px-4 py-4 md:px-8">
          {children}
        </div>
      </Container>

      <ToastContainer
        hideProgressBar
        theme="dark"
        position="bottom-right"
        closeOnClick
        pauseOnFocusLoss={false}
      />
    </>
  );
};

export default Layout;
