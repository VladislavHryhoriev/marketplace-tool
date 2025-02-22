import { TEMPLATES } from "@/consts/TEMPLATES";
import { IOrderRozetkaTemplate } from "../types/rozetka";
import { TrackingResult } from "../types/types";
import { TemplateNames } from "@/consts/TEMPLATES";

export const getTemplateRozetka = async (
  type: TemplateNames,
  order: IOrderRozetkaTemplate,
  ttnInfo: TrackingResult,
) => {
  const cost = order.deliveryName.includes("ukr") ? [60, 45] : [105, 80];

  const productsText = order.products.map((product) => {
    return `${order.products.length > 1 ? "\n- " : ""} ${product.item_name} = ${Math.round(+product.cost)}грн (${product.quantity}шт)`;
  });

  const fullName = order.fullname
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
    .join(" ");

  const templates = {
    [TEMPLATES.missedCall]: `
Добрий день. Не вдалося зв'язатися по номеру телефона, який Ви залишили в замовленні №${order.id} на сайті Розетка. 
Будь ласка, зателефонуйте нам для підтвердження замовлення
(068)554-40-46 (063)969-68-29 (099)566-45-21 або напишіть нам у вайбер.

**Замовили:** ${productsText}
**Отримувач:** ${fullName}
**Адреса доставки:** ${order.address}
**Вартість доставки:** Грошовим переказом ~${cost[0]}грн (При передоплаті ~${cost[1]}грн)

Який спосіб оплати вам підходить?`,

    [TEMPLATES.autoconfirm]: `
Доброго дня, Ваше замовлення №${order.id} на сайті Розетка прийнято.

**Замовили:** ${productsText}
**Отримувач:** ${fullName}
**Адреса доставки:** ${order.address}
**Вартість доставки:** ~${cost[1]}грн
**Спосіб оплати:** На рахунок продавця

**Реквізити для оплати:**`,

    [TEMPLATES.confirmWithoutCall]: `
Доброго дня, Ваше замовлення №${order.id} на сайті Розетка прийнято.

**Замовили:** ${productsText}
**Отримувач:** ${fullName}
**Адреса доставки:** ${order.address}	
**Вартість доставки:** За тарифами перевізника ~${cost[0]}грн
**Спосіб оплати:** Оплата під час отримання товару

Чи підтверджуєте замовлення?`,

    [TEMPLATES.uncollected]: `
Доброго дня, Ваше замовлення №${order.id} вже очікує вас на відділенні пошти.

**Адреса доставки:** ${order.address} ${ttnInfo.ok ? `\n**Дата доставки**: ${ttnInfo.date}` : ""}
**ТТН:** ${order.ttn || ""}

Встигніть забрати посилку, бо відбудеться автоматичне повернення ${ttnInfo.return ?? ""} в кінці дня`,
  };

  if (!templates[type]) console.error("Неправильный шаблон");

  return templates[type].trim() || "";
};
