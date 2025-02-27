export interface IOrder {
  id: number; // ID замовлення
  created: string; // Дата створення замовлення (YYYY-MM-DD, H:i:s)
  changed: string; // Дата зміни замовлення (YYYY-MM-DD, H:i:s)
  amount: string; // Сума замовлення по товарах (decimal(0000000000.00))
  amount_with_discount: string; // Сума замовлення зі знижкою (decimal(0000000000.00))
  cost: string; // Загальна сума замовлення (decimal(0000000000.00))
  cost_with_discount: string; // Фінальна сума (decimal(00000000.00))
  status: number; // Статус замовлення (int 1..51)
  status_group: 1 | 2 | 3; // Група статусу замовлення: 1 - В обробці, 2 - Успішні, 3 - Неуспішні
  items_photos: {
    id: number; // ID товару
    url: string; // URL превью товару
    item_name: string; // Назва товару
    item_url: string; // URL товару
    item_price: string; // Ціна товару (decimal(0000000000.00))
  }[];
  seller_comment: {
    comment: string; // Коментар продавця
    created: number; // Дата створення коментаря (timestamp)
  }[];
  seller_comment_created: string; // Дата створення коментаря продавця (YYYY-MM-DD, H:i:s)
  current_seller_comment: string; // Поточний коментар продавця
  comment: string; // Коментар від покупця
  user_phone: string; // Телефон покупця
  user_title: {
    first_name: string; // Ім'я покупця
    last_name: string; // Прізвище покупця
    second_name: string; // По батькові покупця
    full_name: string; // ПІБ покупця
  };
  user_rating: 1 | 2 | 3; // Відсоток викупу замовлень покупцем
  recipient_phone: string; // Телефон одержувача (Deprecated)
  recipient_title: {
    first_name: string; // Ім'я одержувача (Deprecated)
    last_name: string; // Прізвище одержувача (Deprecated)
    second_name: string; // По батькові одержувача (Deprecated)
    full_name: string; // ПІБ одержувача (Deprecated)
  };
  from_warehouse: number; // Замовлення формується зі складу
  ttn: string; // Товарно-транспортна накладна (Required при статусі = 3)
  total_quantity: number; // Загальна кількість товарів
  mk_created: boolean; // Ознака, де створено ТТН
  can_copy: boolean; // Чи доступне замовлення для копіювання
  created_type: 1 | 2 | 3 | 4 | 6; // Тип створення замовлення
  is_viewed: boolean; // Чи переглянуто замовлення
  callback_off: 0 | 1; // Ознака "Не передзвонювати"
  is_fulfillment: boolean; // Замовлення проходить через Фулфілмент
  duplicate_order_id: number; // ID дубля замовлення
  is_delivery_edit_available: boolean; // Чи доступне редагування доставки
  refund_status: number; // Статус повернення коштів
  ff_can_approve: boolean; // Можливість підтвердити фулфілмент замовлення
  can_prolong: number; // Чи можна продовжити термін резерву
  is_review_request_send: 0 | 1; // Чи відправлений запит на відгук
  review_request_status: string; // Статус запита на відгук
}

export interface CatalogCategory {
  category_id: number; // ID категорії
  name: string; // Назва категорії
  parent_id: number; // ID материнської категорії
}

export interface ItemModel {
  id: number; // ID товару в системі Розетка
  name: string; // Назва товару
  name_ua: string | null; // Назва товару українською (може бути null)
  article: string | null; // Артикул товару (може бути null)
  price_offer_id: string; // ID товару у продавця
  price: number; // Ціна товару
  stock_quantity: number; // Кількість товару в наявності
  weight: number; // Вага товару
  commission_percent: number | null; // Комісія по товару, % (може бути null)
  commission_sum: string | null; // Сума комісії по товару (може бути null)
  catalog_category: CatalogCategory; // Категорія товару
  catalog_id: number; // ID категорії
  group_id: number | null; // ID групи (може бути null)
  photo_preview: string; // Фото-прев'ю, у вигляді посилання
  photo: string[]; // Перелік посилань на фото товару (deprecated)
  moderation_status: number | null; // Статус товару на модерації (deprecated)
  url: string; // Item url в системі Розетка
  sold: number; // Кількість проданих одиниць товару
  uploader_offer_id: string | null; // Id оффера в Uploader (може бути null)
  uploader_status: number | null; // Статус товару в Uploader
  sla_id: number | null; // Набір доставок товару (deprecated)
  sla_rz_id: number; // Набір доставок товару
  producer_name: string; // Назва виробника
  price_old: number; // Стара ціна
  can_use: boolean; // Ознака того, чи можна використовувати товар при створенні замовлення і в комплектах
}

export interface IExtendDelivery {
  delivery: {
    delivery_service_id: number; // ID служби доставки
    delivery_service_name: string; // Назва служби доставки
    recipient_title: string; // ПІБ одержувача
    recipient_first_name: string; // Ім'я одержувача
    recipient_last_name: string; // Прізвище одержувача
    recipient_second_name: string; // По батькові одержувача
    recipient_phone: string; // Телефон одержувача
    another_recipient: boolean; // Прапор, який відповідає за те, що в замовленні покупець і одержувач відрізняються
    delivery_method_id: number; // ID методу доставки
    place_id: number; // ID адреси доставки
    pickup_rz_id: string; // ID адреси доставки в системі Розетка
    place_street: string; // Вулиця
    place_number: string; // Номер відділення служби доставки
    place_house: string; // Номер будинку
    place_flat: string | null; // Номер квартири (може бути null)
    cost: number | null; // Вартість доставки (може бути null)
    city: {
      name_ua: string; // Назва населеного пункту
    };
    ref_id: number; // Ідентифікатор адреси точки видачі в НП
    name_logo: string; // Назва лого служби доставки транслітом
    street_directory_id: number | null; // ID вулиці (може бути null)
    street_id: number | null; // ID вулиці (може бути null)
    email: string; // email одержувача
    reserve_date: string; // Дата резерву
    delivery_date: string; // Дата доставки
  };
}

export interface IExtendPurchases {
  purchases: {
    id: number; // ID покупки
    cost: number; // Загальна ціна покупки (ціна товару × кількість)
    cost_with_discount: number; // Загальна ціна покупки зі знижкою
    price: number; // Ціна за 1 товар
    price_with_discount: number; // Ціна за 1 товар зі знижкою
    quantity: number; // Кількість товарів
    item_id: number; // ID товару
    item_name: string; // Назва товару
    kit_id: number | null; // ID комплекту (може бути null)
    status: 0 | 1 | 2; // Статус товару: 1 - актуальний, 2 - повернутий, 0 - видалений
    item: ItemModel; // Об'єкт товару (деталі товару)
    conf_details: Array<any> | null; // Деталі для конфігурованих товарів (за замовчуванням null)
    ttn: string | null; // ТТН товару (не використовується, може бути null)
    order_status: number | null; // Статус замовлення для конкретного товару
    is_additional_item: boolean; // Ознака додаткового товару
  }[];
}

export interface ErrorResponse {
  code: number; // Код ошибки
  description?: string;
  details: { value: number };
  message: string; // Сообщение об ошибке
}

// export interface RozetkaOrderResponse {
//   errors?: {
//     code: number;
//     message: string;
//     description: string;
//     details: { value: string };
//   };
//   success: boolean;
//   content: {
//     id: number;
//     recipient_title: { full_name: string };
//     purchases: { item_name: string; cost: number; quantity: number }[];
//     delivery: {
//       delivery_service_name: string;
//       delivery_method_id: number;
//       city: { name_ua: string };
//       place_street: string;
//       place_house: string;
//       place_number: string;
//       place_flat: string;
//       name_logo: string;
//     };
//     total_quantity: number;
//     ttn: string;
//     recipient_phone: string;
//   };
// }

export interface IOrdersResponse {
  success: boolean;
  content: { orders: IOrder[] };
  errors?: ErrorResponse;
}

export interface IOrderResponse {
  success: boolean;
  content: IOrder & IExtendDelivery & IExtendPurchases;
  errors?: ErrorResponse;
}
