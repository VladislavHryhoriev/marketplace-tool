import { cn } from "@/lib/utils";
import usePollingStore from "@/store/pollingStore";
import { useEffect } from "react";
import { Button } from "../ui/button";

const PollingOrdersButton = () => {
  const startPolling = usePollingStore((state) => state.startPolling);
  const stopPolling = usePollingStore((state) => state.stopPolling);
  const isPolling = usePollingStore((state) => state.isPolling);

  useEffect(() => {
    isPolling ? startPolling() : stopPolling();
  }, [isPolling, startPolling, stopPolling]);

  return (
    <Button
      onClick={isPolling ? stopPolling : startPolling}
      className={cn(isPolling && "bg-green-500")}
    >
      Проверять новые заказы {isPolling ? "ON" : "OFF"}
    </Button>
  );
};

export default PollingOrdersButton;
