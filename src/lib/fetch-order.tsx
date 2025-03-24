import epicentrApi from "@/clients/epicentr/api";
import novaPoshtaApi from "@/clients/nova-poshta/api";
import { IExtendPaymentType } from "@/clients/rozetka/types";
import { TemplateNames } from "@/consts/TEMPLATES";
import { getOrderInfoRozetka } from "@/lib/rozetka/get-order-info";
import { getTemplate } from "@/lib/templates/get-template";
import { toast } from "react-toastify";

const fetchOrderData = async (
  type: TemplateNames,
  inputTextOrder: string,
  setAreaTextOrder: (text: string) => void,
) => {
  toast.dismiss();
  setAreaTextOrder("Загрузка...");

  if (!inputTextOrder) {
    setAreaTextOrder("");
    toast.error("Введите номер заказа");
    return null;
  }

  try {
    const { order, success } =
      inputTextOrder.length === 9
        ? await getOrderInfoRozetka(inputTextOrder)
        : await epicentrApi.getOrderInfoEpicentr(inputTextOrder);

    if (!success) {
      toast.error("Заказ не найден");
      setAreaTextOrder("");
      return null;
    }

    const ttnInfo = await novaPoshtaApi.getTrackingInfo(
      order.ttn,
      order.recipient.phone,
      type,
    );

    const template = await getTemplate(
      type,
      order,
      ttnInfo,
      inputTextOrder.length === 9 ? "Розетка" : "Епіцентр",
    );

    setAreaTextOrder(template);
    return order;
  } catch (error) {
    console.error(error);
    toast.error("Непредвиденная ошибка");
    return null;
  }
};

export default fetchOrderData;
