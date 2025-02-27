import { TemplateNames } from "@/consts/TEMPLATES";
import { getOrderInfoRozetka } from "@/lib/rozetka/get-order-info";
import { getTemplate } from "@/lib/templates/get-template";
import { toast } from "react-toastify";
import { getOrderInfoEpicentr } from "./epicentr/get-order-info";
import { getTrackingInfo } from "./get-tracking-info";

const fetchOrder = async (
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
        const template = await getTemplate(type, order, ttnInfo, "Розетка");
        return setAreaTextOrder(template);
      }
      case 8: {
        const { order, success } = await getOrderInfoEpicentr(inputTextOrder);
        if (!success) return toast.error("Заказ не найден");
        const ttnInfo = await getTrackingInfo(order.ttn, order.phone);
        const template = await getTemplate(type, order, ttnInfo, "Епіцентр");
        return setAreaTextOrder(template);
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

export default fetchOrder;
