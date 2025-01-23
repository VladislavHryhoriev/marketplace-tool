import { Button } from "@/components/ui/button";
import { getOrderInfoEpicentr } from "@/lib/epicentr/get-order-info";
import { getDeliveryDate } from "@/lib/get-delivery-date";
import { getOrderInfoRozetka } from "@/lib/rozetka/get-order-info";
import { getTemplateEpicentr } from "@/lib/templates/get-template-epicentr";
import { getTemplateRozetka } from "@/lib/templates/get-template-rozetka";
import { TemplateNames } from "@/lib/types";
import { CircleCheckBig, ClockArrowDown, PhoneMissed } from "lucide-react";
import { useCallback } from "react";
import { toast } from "react-toastify";

interface Props {
  inputTextOrder: string;
  setAreaTextOrder: (text: string) => void;
}

interface OrderResponse<TOrder = any> {
  order: TOrder;
  success: boolean;
}

type MarketHandler<TOrder = any> = (
  inputTextOrder: string,
) => Promise<OrderResponse<TOrder>>;

const marketHandlers: Record<string, MarketHandler> = {
  83: getOrderInfoRozetka,
  84: getOrderInfoRozetka,
  43: getOrderInfoEpicentr,
  44: getOrderInfoEpicentr,
};

const fetchOrderInfo = async (
  inputTextOrder: string,
  setAreaTextOrder: (text: string) => void,
  templateName: TemplateNames,
  marketHandlers: Record<string, MarketHandler>,
) => {
  for (const [marketCode, handler] of Object.entries(marketHandlers)) {
    if (inputTextOrder.startsWith(marketCode)) {
      try {
        const { order, success } = await handler(inputTextOrder);

        if (!success) {
          toast.error("Заказ не найден");
          return;
        }

        const ttnInfo = await getDeliveryDate(order.ttn, order.phone);

        if (marketCode === "43" || marketCode === "44") {
          const text = await getTemplateEpicentr(templateName, order, ttnInfo);
          setAreaTextOrder(text);
        }

        if (marketCode === "83" || marketCode === "84") {
          const text = await getTemplateRozetka(templateName, order, ttnInfo);
          setAreaTextOrder(text);
        }
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при получении информации о заказе");
      }
    }
  }
};

const TemplateButtons = ({ inputTextOrder, setAreaTextOrder }: Props) => {
  const handler = useCallback(
    async (templateName: TemplateNames, inputTextOrder: string) => {
      toast.dismiss();
      setAreaTextOrder("");

      if (!inputTextOrder) {
        toast.error("Введите номер заказа");
        return;
      }

      await fetchOrderInfo(
        inputTextOrder,
        setAreaTextOrder,
        templateName,
        marketHandlers,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div className="mt-4 flex flex-col gap-2">
      <Button onClick={() => handler("missed-call", inputTextOrder)}>
        <PhoneMissed />
        Недозвон
      </Button>
      <Button onClick={() => handler("auto-confirm", inputTextOrder)}>
        <CircleCheckBig />
        Автоподтверждение
      </Button>
      <Button onClick={() => handler("uncollected", inputTextOrder)}>
        <ClockArrowDown />
        Не забирает заказ
      </Button>
    </div>
  );
};

export default TemplateButtons;
