"use client";
import Container from "@/components/shared/container";
import { Tabs } from "@/components/shared/tabs";
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
    <Container className="mt-4">
      <Tabs />
      <div>{children}</div>
      <ToastContainer
        hideProgressBar
        theme="dark"
        position="bottom-right"
        closeOnClick
        pauseOnFocusLoss={false}
      />
    </Container>
  );
};

export default Layout;
