import { OrderRozetka, TemplateNames } from "../types";

export const getTemplateRozetka = async (
  type: TemplateNames,
  order: OrderRozetka,
) => {
  const cost =
    order.deliveryName === "ukr-pochta" || order.deliveryName === "ukrposhta"
      ? [60, 45]
      : [105, 80];

  const productsText = order.products.map((product) => {
    return `${order.products.length > 1 ? "\n- " : ""} ${product.item_name} = ${Math.round(+product.cost)}грн (${product.quantity}шт)`;
  });

  if (type === "missed-call") {
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

  if (type === "auto-confirm") {
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

  if (type === "uncollected") {
    return `
Доброго дня, Ваше замовлення №${order.id} вже очікує вас на відділенні пошти.

**Адреса доставки:** ${order.address}
**ТТН:** ${order.ttn}

Встигніть забрати посилку, бо відбудеться автоматичне повернення.
`.trim();
  }

  return "";
};
