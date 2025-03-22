import epicentrApi from "@/clients/epicentr/api";
import novaPoshtaApi from "@/clients/nova-poshta/api";
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

  const getTrackingInfo = novaPoshtaApi.getTrackingInfo.bind(novaPoshtaApi);
  const getOrderInfoEpicentr =
    epicentrApi.getOrderInfoEpicentr.bind(epicentrApi);

  try {
    switch (inputTextOrder.length) {
      case 9: {
        const { order, success } = await getOrderInfoRozetka(inputTextOrder);
        if (!success) {
          toast.error("Заказ не найден");
          return null;
        }
        const ttnInfo = await getTrackingInfo(order.ttn, order.phone);
        const template = await getTemplate(type, order, ttnInfo, "Розетка");
        setAreaTextOrder(template);
        return order;
      }
      case 8: {
        const { order, success } = await getOrderInfoEpicentr(inputTextOrder);
        if (!success) {
          toast.error("Заказ не найден");
          return null;
        }
        const ttnInfo = await getTrackingInfo(order.ttn, order.phone);
        const template = await getTemplate(type, order, ttnInfo, "Епіцентр");
        setAreaTextOrder(template);
        return order;
      }

      default: {
        setAreaTextOrder("");
        toast.error("Номер заказа не с маркетплейса");
        return null;
      }
    }
  } catch (error) {
    console.error(error);
    toast.error("Непредвиденная ошибка");
    return null;
  }
};

export default fetchOrderData;
