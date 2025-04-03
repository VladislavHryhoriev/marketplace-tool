const DELIVERY_STATUSES = {
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

export type StatusCode = keyof typeof DELIVERY_STATUSES;

const getStatusMessage = (statusCode: number): string => {
  return DELIVERY_STATUSES[statusCode as StatusCode];
};

export { DELIVERY_STATUSES, getStatusMessage };
