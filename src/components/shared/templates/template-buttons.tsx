import { Button } from "@/components/ui/button";
import { BUTTONS_CONFIG } from "@/constants";
import { fetchOrderInfo } from "@/lib/fetch-order-Info";
import { useGlobalStore } from "@/store/store";

const TemplateButtons = () => {
  const inputTextOrder = useGlobalStore((state) => state.inputTextOrder);
  const setAreaTextOrder = useGlobalStore((state) => state.setAreaTextOrder);

  return (
    <div className="mt-4 flex flex-col gap-2">
      {BUTTONS_CONFIG.map(({ type, icon, label }) => (
        <Button
          key={type}
          onClick={() => fetchOrderInfo(type, inputTextOrder, setAreaTextOrder)}
        >
          {icon}
          {label}
        </Button>
      ))}
    </div>
  );
};

export default TemplateButtons;
