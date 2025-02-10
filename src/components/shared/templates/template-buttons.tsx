import { Button } from "@/components/ui/button";
import { BUTTONS_CONFIG } from "@/constants";
import { getOrderInfoEpicentr } from "@/lib/epicentr/get-order-info";
import { getDeliveryDate } from "@/lib/get-delivery-date";
import { getOrderInfoRozetka } from "@/lib/rozetka/get-order-info";
import { getTemplateEpicentr } from "@/lib/templates/get-template-epicentr";
import { getTemplateRozetka } from "@/lib/templates/get-template-rozetka";
import { TemplateNames } from "@/lib/types";
import { useGlobalStore } from "@/store/store";
import { toast } from "react-toastify";

const fetchOrderInfo = async (
  type: TemplateNames,
  inputTextOrder: string,
  setAreaTextOrder: (text: string) => void,
) => {
  toast.dismiss();
  setAreaTextOrder("Загрузка...");
  if (!inputTextOrder) return toast.error("Введите номер заказа");

  try {
    switch (inputTextOrder.length) {
      case 9: {
        const { order, success } = await getOrderInfoRozetka(inputTextOrder);
        if (!success) return toast.error("Заказ не найден");
        const ttnInfo = await getDeliveryDate(order.ttn, order.phone);
        const templateText = await getTemplateRozetka(type, order, ttnInfo);
        return setAreaTextOrder(templateText);
      }
      case 8: {
        const { order, success } = await getOrderInfoEpicentr(inputTextOrder);
        if (!success) return toast.error("Заказ не найден");
        const ttnInfo = await getDeliveryDate(order.ttn, order.phone);
        const templateText = await getTemplateEpicentr(type, order, ttnInfo);
        return setAreaTextOrder(templateText);
      }

      default: {
        setAreaTextOrder("");
        return toast.error("Номер заказа не с маркетплейса");
      }
    }
  } catch (error) {
    console.error(error);
    toast.error("Непредвиденная ошибка");
  }
};

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
