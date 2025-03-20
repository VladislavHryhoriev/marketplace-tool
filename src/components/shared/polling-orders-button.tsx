import usePollingStore from "@/store/pollingStore";
import { LoaderPinwheel } from "lucide-react";
import { Button } from "../ui/button";

const PollingOrdersButton = () => {
  const startPolling = usePollingStore((state) => state.startPolling);
  const stopPolling = usePollingStore((state) => state.stopPolling);
  const isPolling = usePollingStore((state) => state.isPolling);
  const progress = usePollingStore((state) => state.progress);

  return (
    <Button
      onClick={isPolling ? stopPolling : startPolling}
      className="relative overflow-hidden rounded-lg"
    >
      <div
        className="absolute top-0 left-0 h-full bg-green-400/50 transition-all"
        style={{ width: `${progress}%` }}
      />
      {isPolling ? (
        <div className="z-10 flex items-center gap-2">
          Проверка заказов включена
          <LoaderPinwheel className="size-4 animate-spin" />
        </div>
      ) : (
        <div className="z-10">Проверка заказов выключена</div>
      )}
    </Button>
  );
};

export default PollingOrdersButton;
