import { toast } from "react-toastify";
import { DeliveryResponse, OrderEpicentr, TemplateNames } from "../types";
import { TEMPLATE_TYPES } from "@/constants";

export const getTemplateEpicentr = async (
  type: TemplateNames,
  order: OrderEpicentr,
  ttnInfo: DeliveryResponse,
) => {
  const cost = order.deliveryName.includes("ukr") ? [60, 45] : [105, 80];

  const productsText = order.products.map((product) => {
    return `${order.products.length > 1 ? "\n- " : ""} ${product.title} = ${Math.round(product.subtotal)}грн (${product.quantity}шт)`;
  });

  const templates = {
    [TEMPLATE_TYPES.missedCall]: `
Добрий день. Не вдалося зв'язатися по номеру телефона, який Ви залишили в замовленні №${order.id} на сайті Епіцентр. 
Будь ласка, зателефонуйте нам для підтвердження замовлення
(068)554-40-46 (063)969-68-29 (099)566-45-21 або напишіть нам у вайбер.

**Замовили:** ${productsText}
**Отримувач:** ${order.fullname}
**Адреса доставки:** ${order.address}
**Вартість доставки:** Грошовим переказом ~${cost[0]}грн (При передоплаті ~${cost[1]}грн)

Який спосіб оплати вам підходить?
`.trim(),

    [TEMPLATE_TYPES.autoconfirm]: ``.trim(),

    [TEMPLATE_TYPES.confirmWithoutCall]: `
Доброго дня, Ваше замовлення №${order.id} на сайті Епіцентр прийнято.

**Замовили:** ${productsText}
**Отримувач:** ${order.fullname}
**Адреса доставки:** ${order.address}	
**Вартість доставки:** За тарифами перевізника ~${cost[0]}грн
**Спосіб оплати:** Оплата під час отримання товару

Чи підтверджуєте замовлення?
`.trim(),

    [TEMPLATE_TYPES.uncollected]: `
Доброго дня, Ваше замовлення №${order.id} вже очікує вас на відділенні пошти.

**Адреса доставки:** ${order.address} ${ttnInfo.ok ? `\n**Дата доставки**: ${ttnInfo.deliveryDate}` : ""}
**ТТН:** ${order.ttn || ""}

Встигніть забрати посилку, бо відбудеться автоматичне повернення ${ttnInfo.ok ? `${ttnInfo.returnDate} в кінці дня` : ""}
`.trim(),
  };

  if (!templates[type]) {
    toast.error("Неправильный шаблон");
  }

  return templates[type] || "";
};
