import { Button } from "@/components/ui/button";
import { getOrderInfoEpicentr } from "@/lib/epicentr/get-order-info";
import { getDeliveryDate } from "@/lib/get-delivery-date";
import { getOrderInfo } from "@/lib/rozetka/get-order-info";
import { getTemplateEpicentr } from "@/lib/templates/get-template-epicentr";
import { getTemplateRozetka } from "@/lib/templates/get-template-rozetka";
import { TemplateNames } from "@/lib/types";
import { CircleCheckBig, ClockArrowDown, PhoneMissed } from "lucide-react";
import { toast } from "react-toastify";

interface Props {
  inputID: string;
  setAreaText: (text: string) => void;
}

const checkMarket = (inputID: string, strArr: string[]) => {
  for (const el of strArr) if (inputID.startsWith(el)) return true;
};

const TemplateButtons = ({ inputID, setAreaText }: Props) => {
  const handler = async (templateName: TemplateNames) => {
    setAreaText("");

    if (!inputID) toast.warn("Введите номер заказа");

    // Rozetka
    if (checkMarket(inputID, ["83", "84"])) {
      const { order, success } = await getOrderInfo(inputID);

      if (!success) {
        setAreaText("Заказ не найден");
        return;
      }

      const ttnInfo = await getDeliveryDate(order.ttn, order.phone);
      const text = await getTemplateRozetka(templateName, order, ttnInfo);
      setAreaText(text);
    }

    // Epicentr
    if (checkMarket(inputID, ["43", "44"])) {
      const { order, ok } = await getOrderInfoEpicentr(inputID);
      if (!ok) {
        setAreaText("Заказ не найден");
        return;
      }

      const ttnInfo = await getDeliveryDate(order.ttn, order.phone);
      const text = await getTemplateEpicentr(templateName, order, ttnInfo);
      setAreaText(text);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      <Button onClick={() => handler("missed-call")}>
        <PhoneMissed />
        Недозвон
      </Button>
      <Button onClick={() => handler("auto-confirm")}>
        <CircleCheckBig />
        Автоподтверждение
      </Button>
      <Button onClick={() => handler("uncollected")}>
        <ClockArrowDown />
        Не забирает заказ
      </Button>
    </div>
  );
};

export default TemplateButtons;
