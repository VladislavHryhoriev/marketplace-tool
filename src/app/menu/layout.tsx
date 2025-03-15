"use client";
import Container from "@/components/shared/container";
import { Navigation } from "@/components/shared/navigation";
import usePollingStore from "@/store/pollingStore";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isPolling = usePollingStore((state) => state.isPolling);
  const startPolling = usePollingStore((state) => state.startPolling);
  const stopPolling = usePollingStore((state) => state.stopPolling);

  useEffect(() => {
    isPolling ? startPolling() : stopPolling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPolling]);

  return (
    <>
      <Container className="flex h-svh justify-between">
        <Navigation />
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
