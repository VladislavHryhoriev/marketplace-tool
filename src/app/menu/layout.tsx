"use client";
import Container from "@/components/shared/container";
import { Navigation } from "@/components/shared/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import usePollingStore from "@/store/pollingStore";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import useGlobalStore from "@/store/globalStore";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isPolling = usePollingStore((state) => state.isPolling);
  const startPolling = usePollingStore((state) => state.startPolling);
  const stopPolling = usePollingStore((state) => state.stopPolling);
  const setIsOpenMenu = useGlobalStore((state) => state.setIsOpenMenu);

  useEffect(() => {
    isPolling ? startPolling() : stopPolling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPolling]);

  return (
    <>
      <Container className="flex h-svh justify-between">
        <Navigation />
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsOpenMenu(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-8 py-4">{children}</div>
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
