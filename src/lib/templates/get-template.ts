import { TemplateNames, TEMPLATES } from "@/consts/TEMPLATES";
import { calculateCost } from "../calculate-cost";
import { capitalize } from "../capitalize";
import { TrackingResult } from "../../clients/nova-poshta/types";
import { IOrderTemplate } from "../types/types";

export const getTemplate = async (
  type: TemplateNames,
  order: IOrderTemplate,
  ttnInfo: TrackingResult,
  storeName: "Епіцентр" | "Розетка",
) => {
  const cost = calculateCost(order.deliveryName, order.amount);
  const fullName = capitalize(order.fullname);
  const productsText = order.products.map((product) => {
    return `${order.products.length > 1 ? "\n- " : ""} ${product.title} = ${Math.round(product.cost)}грн (${product.quantity}${product.measure || "шт"})`;
  });

  const templates = {
    [TEMPLATES.missedCall]: `
Добрий день. Не вдалося зв'язатися по номеру телефона, який Ви залишили в замовленні №${order.id} на сайті ${storeName}. 
Будь ласка, зателефонуйте нам для підтвердження замовлення
(068)554-40-46 (063)969-68-29 (099)566-45-21 або напишіть нам у вайбер.

**Замовили:** ${productsText}
**Отримувач:** ${fullName}
**Адреса доставки:** ${order.address}
**Спосіб оплати:** Оплата під час отримання товару
**Вартість доставки:** ~${cost.payed}грн
**Комісія за грошовий переказ:** ${cost.commision}грн

Щоб не сплачувати грошовий переказ, можемо зробити по передоплаті, як вам буде зручніше?`,

    [TEMPLATES.autoconfirm]: `
Доброго дня, Ваше замовлення №${order.id} на сайті ${storeName} прийнято.

**Замовили:** ${productsText}
**Отримувач:** ${fullName}
**Адреса доставки:** ${order.address}
**Вартість доставки:** ~${cost.payed}грн
**Спосіб оплати:** На рахунок продавця

**Реквізити для оплати:** Після оплати пришліть, будь ласка, квитанцію.`,

    [TEMPLATES.confirmWithoutCall]: `
Доброго дня, Ваше замовлення №${order.id} на сайті ${storeName} прийнято.

**Замовили:** ${productsText}
**Отримувач:** ${fullName}
**Адреса доставки:** ${order.address}	
**Спосіб оплати:** Оплата під час отримання товару
**Вартість доставки:** ~${cost.payed}грн
**Комісія за грошовий переказ:** ${cost.commision}грн

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
