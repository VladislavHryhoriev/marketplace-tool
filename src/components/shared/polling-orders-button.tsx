import usePollingStore from "@/store/pollingStore";
import { LoaderPinwheel } from "lucide-react";
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
    <Button onClick={isPolling ? stopPolling : startPolling}>
      {isPolling ? (
        <div className="flex items-center gap-2">
          Проверка заказов включена
          <LoaderPinwheel className="size-4 animate-spin" />
        </div>
      ) : (
        <div>Проверка заказов выключена</div>
      )}
    </Button>
  );
};

export default PollingOrdersButton;
