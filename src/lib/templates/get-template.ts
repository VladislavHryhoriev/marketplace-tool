import { TemplateNames, TEMPLATES } from "@/consts/TEMPLATES";
import { TrackingResult } from "../../clients/nova-poshta/types";
import { calculateCost } from "../calculate-cost";
import { capitalize } from "../capitalize";
import { IOrderTemplate } from "../types/types";

export const getTemplate = async (
  type: TemplateNames,
  order: IOrderTemplate,
  ttnInfo: TrackingResult,
  storeName: "Епіцентр" | "Розетка",
) => {
  const cost = calculateCost(order.deliveryName, order.amount);
  const fullName = capitalize(order.recipient.name);
  const productsText = order.products.map((product) => {
    return `${order.products.length > 1 ? "\n🔹" : ""} ${product.title} = ${Math.round(product.cost)}грн (${product.quantity}${product.measure || "шт"})`;
  });

  const payment =
    order.paymentType === "cash" && type !== TEMPLATES.autoconfirm
      ? `💳 **Спосіб оплати:** ${order.paymentTypeName}`
      : `💳 **Спосіб оплати:** Оплата на карту`;

  const orderBlocks = {
    welcome: `Доброго дня! Ваше замовлення №${order.id} на сайті ${storeName} прийнято.`,
    items: `📦 **Ваше замовлення:** ${productsText}\n`,
    recipient: `👤 **Отримувач:** ${fullName}`,
    address: `📍 **Адреса доставки:** ${order.address}`,
    payment,
    deliveryCost: `🚚 **Вартість доставки:** ~${cost.payed}грн`,
    commision: `💰 **Грошовий переказ:** ${cost.commision}грн`,

    ttn: `📦 **ТТН:** ${order.ttn || ""}`,

    get base() {
      return [
        this.items,
        this.recipient,
        this.address,
        this.payment,
        this.deliveryCost,
        order.paymentType === "cash" && type !== TEMPLATES.autoconfirm
          ? this.commision
          : null,
      ]
        .filter(Boolean)
        .join("\n");
    },
  };

  const templates = {
    /// missed call
    [TEMPLATES.missedCall]: `	
Добрий день. Не вдалося зв'язатися по номеру телефона, який Ви залишили в замовленні №${order.id} на сайті ${storeName}.
Будь ласка, зателефонуйте нам для підтвердження замовлення
(068)554-40-46 (063)969-68-29 (099)566-45-21 або напишіть нам.

${orderBlocks.base}

__Щоб не сплачувати грошовий переказ, можете оплатити на карту.__

Як вам буде зручніше?`,

    /// auto confirm
    [TEMPLATES.autoconfirm]: `
${orderBlocks.welcome}

${orderBlocks.base}

🧾 **Реквізити для оплати:**

📌 Після оплати надішліть, будь ласка, квитанцію`,

    /// confirm without call
    [TEMPLATES.confirmWithoutCall]: `
${orderBlocks.welcome}

${orderBlocks.base}

Чи підтверджуєте замовлення?`,

    /// uncollected
    [TEMPLATES.uncollected]: `
Доброго дня! Ваше замовлення №${order.id} вже очікує вас на відділенні пошти.

${orderBlocks.address}${ttnInfo.date ? `\n**Дата доставки**: ${ttnInfo.date}` : ""}
${orderBlocks.ttn}

Встигніть забрати посилку, бо відбудеться автоматичне повернення ${ttnInfo.return ?? ""} в кінці дня`,

    /// return order
    [TEMPLATES.returnOrder]: `
Доброго дня! Ваше замовлення №${order.id} на сайті ${storeName}.

${orderBlocks.items}

🔄 Повернення товару відправляти (**в оригінальній упаковці**) на:

**Гусак Олександр Петрович**
📍 Вінницька обл., Вінницький р-н, с. Юзвин
📦 Нова Пошта №1, вул. Некрасова, 6
📞 0989015155

💡 Або скористайтеся Легким поверненням (безкоштовно) 👉 novaposhta.ua/lp
📌 Після відправки повідомте номер ТТН.
🔍 Після перевірки товару ми зв’яжемося з вами для подальших дій.
`,
  };

  if (!templates[type]) console.error("Неправильный шаблон");

  return templates[type].trim().replace(", кв. null", "") || "";
};
