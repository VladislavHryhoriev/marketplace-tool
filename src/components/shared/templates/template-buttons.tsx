import { Button } from "@/components/ui/button";
import BUTTONS_CONFIG from "@/consts/BUTTONS_CONFIG";
import { TemplateNames } from "@/consts/TEMPLATES";
import fetchOrderData from "@/lib/fetch-order";
import useGlobalStore from "@/store/globalStore";

const TemplateButtons = () => {
  const inputTextOrder = useGlobalStore((state) => state.inputTextOrder);
  const setAreaTextOrder = useGlobalStore((state) => state.setAreaTextOrder);
  const setActiveOrder = useGlobalStore((state) => state.setActiveOrder);
  const setActiveTemplate = useGlobalStore((state) => state.setActiveTemplate);

  const handleClick = async (type: TemplateNames) => {
    const order = await fetchOrderData(type, inputTextOrder, setAreaTextOrder);
    if (order) {
      setActiveOrder(order);
      setActiveTemplate(type);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {BUTTONS_CONFIG.map(({ type, icon, label }) => (
        <Button key={type} onClick={() => handleClick(type)}>
          {icon}
          {label}
        </Button>
      ))}
    </div>
  );
};

export default TemplateButtons;
