import { templateTypes } from "@/config";
import { DeliveryResponse, TemplateNames } from "../types";
import { IOrderRozetkaTemplate } from "../types/rozetka";

export const getTemplateRozetka = async (
  type: TemplateNames,
  order: IOrderRozetkaTemplate,
  ttnInfo: DeliveryResponse,
) => {
  const cost =
    order.deliveryName === "ukr-pochta" || order.deliveryName === "ukrposhta"
      ? [60, 45]
      : [105, 80];

  const productsText = order.products.map((product) => {
    return `${order.products.length > 1 ? "\n- " : ""} ${product.item_name} = ${Math.round(+product.cost)}грн (${product.quantity}шт)`;
  });

  if (type === templateTypes.missedCall) {
    return `
Добрий день. Не вдалося зв'язатися по номеру телефона, який Ви залишили в замовленні №${order.id} на сайті Розетка. 
Будь ласка, зателефонуйте нам для підтвердження замовлення
(068)554-40-46 (063)969-68-29 (099)566-45-21 або напишіть нам у вайбер.

**Замовили:** ${productsText}
**Отримувач:** ${order.fullname}
**Адреса доставки:** ${order.address}
**Вартість доставки:** Грошовим переказом ~${cost[0]}грн (При передоплаті ~${cost[1]}грн)

Який спосіб оплати вам підходить?`.trim();
  }

  if (type === templateTypes.autoconfirm) {
    return `
Доброго дня, Ваше замовлення №${order.id} на сайті Розетка прийнято.

**Замовили:** ${productsText}
**Отримувач:** ${order.fullname}
**Адреса доставки:** ${order.address}
**Вартість доставки:** ~${cost[1]}грн
**Спосіб оплати:** На рахунок продавця

Реквізити для оплати:
`.trim();
  }

  if (type === templateTypes.confirmWithoutCall) {
    return `
Доброго дня, Ваше замовлення №${order.id} на сайті Розетка прийнято.

**Замовили:** ${productsText}
**Отримувач:** ${order.fullname}
**Адреса доставки:** ${order.address}	
**Вартість доставки:** За тарифами перевізника ~${cost[0]}грн
**Спосіб оплати:** Оплата під час отримання товару

Чи підтверджуєте замовлення?
`.trim();
  }

  if (type === templateTypes.uncollected) {
    return `
Доброго дня, Ваше замовлення №${order.id} вже очікує вас на відділенні пошти.

**Адреса доставки:** ${order.address} ${ttnInfo.ok ? `\n**Дата доставки**: ${ttnInfo.deliveryDate}` : ""}
**ТТН:** ${order.ttn}

Встигніть забрати посилку, бо відбудеться автоматичне повернення ${ttnInfo.ok ? `${ttnInfo.returnDate} в кінці дня` : ""}
`.trim();
  }

  return "";
};
