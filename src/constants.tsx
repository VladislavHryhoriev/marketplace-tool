import {
  CircleCheckBig,
  ClockArrowDown,
  PhoneMissed,
  PhoneOff,
} from "lucide-react";

export const DELIVERY_STATUSES = {
  1: "Відправник самостійно створив цю накладну, але ще не надав до відправки",
  2: "Видалено",
  3: "Номер не знайдено",
  4: "Відправлення у місті ХХXХ. (Статус для межобластных отправлений)",
  41: "Відправлення у місті ХХXХ. (Статус для услуг локал стандарт і локал експресс - доставка в межах міста)",
  5: "Відправлення прямує до міста YYYY",
  6: "Відправлення у місті YYYY, орієнтовна доставка до ВІДДІЛЕННЯ-XXX dd-mm. Очікуйте додаткове повідомлення про прибуття",
  7: "Прибув на відділення",
  8: "Прибув на відділення (завантажено в Поштомат)",
  9: "Відправлення отримано",
  10: "Відправлення отримано %DateReceived%. Протягом доби ви одержите SMS-повідомлення про надходження грошового переказу та зможете отримати його в касі відділення «Нова пошта»",
  11: "Відправлення отримано %DateReceived%. Грошовий переказ видано одержувачу.",
  12: "Нова Пошта комплектує ваше відправлення",
  101: "На шляху до одержувача",
  102: "Відмова від отримання (Відправником створено замовлення на повернення)",
  103: "Відмова одержувача (отримувач відмовився від відправлення)",
  104: "Змінено адресу",
  105: "Припинено зберігання",
  106: "Одержано і створено ЄН зворотньої доставки",
  111: "Невдала спроба доставки через відсутність Одержувача на адресі або зв'язку з ним",
  112: "Дата доставки перенесена Одержувачем",
} as const;

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : "http://localhost:3000";

export const API_URLS = {
  telegram: {
    sendMessage: `${BASE_URL}/api/telegram/send-message`,
    deleteMessage: `${BASE_URL}/api/telegram/delete-message`,
  },

  rozetka: {
    newOrders: `${BASE_URL}/api/rozetka/orders/search?types=4`,
    orderInfo: (id: string) =>
      `${BASE_URL}/api/rozetka/orders/${id}?expand=delivery,purchases`,
    orders: `${BASE_URL}/api/rozetka/orders`,
    token: `${BASE_URL}/api/rozetka/sites`,
    updateOrderStatus: (id: number) => `${BASE_URL}/api/rozetka/orders/${id}`,
  },

  epicentr: {
    orders: (id: string) =>
      `${BASE_URL}/api/epicentr/v3/oms/orders?filter[number]=${id}`,
    orderInfo: (id: string) => `${BASE_URL}/api/epicentr/v2/oms/orders/${id}`,
  },

  novaPoshta: { route: `${BASE_URL}/api/nova-poshta` },
};

export const LINKS = {
  rozetka: { new: "https://seller.rozetka.com.ua/main/orders/new" },
  novaPoshta: { api: `https://api.novaposhta.ua/v2.0/json/` },
} as const;

export const TEMPLATES = {
  autoconfirm: "AUTOCONFIRM",
  missedCall: "MISSED_CALL",
  uncollected: "UNCOLLECTED",
  confirmWithoutCall: "CONFIRM_WITHOUT_CALL",
} as const;

export const BUTTONS_CONFIG = [
  {
    type: TEMPLATES.missedCall,
    icon: <PhoneMissed />,
    label: "Недозвон",
  },
  {
    type: TEMPLATES.autoconfirm,
    icon: <CircleCheckBig />,
    label: "Автоподтверждение",
  },
  {
    type: TEMPLATES.confirmWithoutCall,
    icon: <PhoneOff />,
    label: "Подтверждение без звонка",
  },
  {
    type: TEMPLATES.uncollected,
    icon: <ClockArrowDown />,
    label: "Не забирает заказ",
  },
] as const;
