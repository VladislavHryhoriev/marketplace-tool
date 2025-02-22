import { useOrdersPolling } from "@/hooks/useOrdersPolling";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const PollingOrdersButton = () => {
  const { togglePolling, isPolling } = useOrdersPolling();

  return (
    <Button onClick={togglePolling} className={cn(isPolling && "bg-green-500")}>
      Проверять новые заказы {isPolling ? "ON" : "OFF"}
    </Button>
  );
};

export default PollingOrdersButton;
