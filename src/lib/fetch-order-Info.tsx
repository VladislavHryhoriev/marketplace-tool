import { getOrderInfoEpicentr } from "@/lib/epicentr/get-order-info";
import { getTrackingInfo } from "@/lib/get-tracking-info";
import { getOrderInfoRozetka } from "@/lib/rozetka/get-order-info";
import { getTemplateEpicentr } from "@/lib/templates/get-template-epicentr";
import { getTemplateRozetka } from "@/lib/templates/get-template-rozetka";
import { TemplateNames } from "@/lib/types/types";
import { toast } from "react-toastify";

export const fetchOrderInfo = async (
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
        const ttnInfo = await getTrackingInfo(order.ttn, order.phone);
        const templateText = await getTemplateRozetka(type, order, ttnInfo);
        return setAreaTextOrder(templateText);
      }
      case 8: {
        const { order, success } = await getOrderInfoEpicentr(inputTextOrder);
        if (!success) return toast.error("Заказ не найден");
        const ttnInfo = await getTrackingInfo(order.ttn, order.phone);
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
