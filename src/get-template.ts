import { Order } from "./lib/rozetka/get-order-info";

export type TemplateNames = "missed-call" | "auto-confirm" | "uncollected";

export const getTemplate = async (type: TemplateNames, order: Order) => {
  const cost = order.deliveryName === "nova-pochta" ? [105, 80] : [60, 45];

  const productsText = order.products.map(
    (product) =>
      `${order.products.length > 1 ? "\n- " : ""}${product.item_name}`,
  );

  if (type === "missed-call") {
    return `
Добрий день. Не вдалося зв'язатися по номеру телефона, який Ви залишили в замовленні. 
Будь ласка, зателефонуйте нам для підтвердження замовлення 
(068)554-40-46 (063)969-68-29 (099)566-45-21

**Замовили:** ${productsText}
**Отримувач:** ${order.fullname}
**Адрес доставки:** ${order.address}
**Вартість доставки:** Грошовим переказом ~${cost[0]}грн (При передоплаті ~${cost[1]}грн)

Який спосіб оплати вам підходить?`.trim();
  }

  if (type === "auto-confirm") {
    return `
Доброго дня, Ваше оплачене замовлення №${order.id} на сайті Розетка підтверджене автоматично.

**Замовили:** ${productsText}
**Отримувач:** ${order.fullname}
**Адрес доставки:** ${order.address}
**Вартість доставки:** ~${cost[1]}грн

Додатково на відділенні розрахуєтесь за доставку ~${cost[1]}грн. Очікуйте СМС повідомлення з номером ТТН після 18:00 в день відправки.
`.trim();
  }

  if (type === "uncollected") {
    return `
Доброго дня, ваше замовлення №${order.id} вже очікує вас на відділенні пошти.

**Адрес доставки:** (Нова Пошта) Вишневе, ул. Чорновола 48Б, Відділення №5
**ТТН:** ${order.ttn}

Встигніть забрати посилку, бо відбудеться автоматичне повернення.
`.trim();
  }

  return "";
};
