import { Button } from "@/components/ui/button";
import BUTTONS_CONFIG from "@/consts/BUTTONS_CONFIG";
import fetchOrderData from "@/lib/fetch-order";
import useGlobalStore from "@/store/globalStore";

const TemplateButtons = () => {
  const inputTextOrder = useGlobalStore((state) => state.inputTextOrder);
  const setAreaTextOrder = useGlobalStore((state) => state.setAreaTextOrder);

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {BUTTONS_CONFIG.map(({ type, icon, label }) => (
        <Button
          key={type}
          onClick={() => fetchOrderData(type, inputTextOrder, setAreaTextOrder)}
        >
          {icon}
          {label}
        </Button>
      ))}
    </div>
  );
};

export default TemplateButtons;
