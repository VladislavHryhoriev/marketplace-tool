import { getOrderInfoEpicentr } from "@/lib/epicentr/get-order-info";
import { getDeliveryDate } from "@/lib/get-delivery-date";
import { getOrderInfoRozetka } from "@/lib/rozetka/get-order-info";
import { getTemplateEpicentr } from "@/lib/templates/get-template-epicentr";
import { getTemplateRozetka } from "@/lib/templates/get-template-rozetka";
import { TemplateNames } from "@/lib/types";
import { useCallback } from "react";
import { toast } from "react-toastify";

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
  45: getOrderInfoEpicentr,
};

export const useFetchOrderInfo = (setAreaTextOrder: (text: string) => void) => {
  return useCallback(
    async (templateName: TemplateNames, inputTextOrder: string) => {
      toast.dismiss();
      setAreaTextOrder("");

      if (!inputTextOrder) {
        toast.error("Введите номер заказа");
        return;
      }

      for (const [marketCode, handler] of Object.entries(marketHandlers)) {
        if (inputTextOrder.startsWith(marketCode)) {
          try {
            const { order, success } = await handler(inputTextOrder);

            if (!success) {
              toast.error("Заказ не найден");
              return;
            }

            const ttnInfo = await getDeliveryDate(order.ttn, order.phone);

            const templateText =
              marketCode === "43" || marketCode === "44"
                ? await getTemplateEpicentr(templateName, order, ttnInfo)
                : await getTemplateRozetka(templateName, order, ttnInfo);

            setAreaTextOrder(templateText);
          } catch (error) {
            console.error(error);
            toast.error("Ошибка при получении информации о заказе");
          }
        }
      }
    },
    [setAreaTextOrder],
  );
};
