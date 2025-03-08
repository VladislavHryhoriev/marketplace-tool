/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Company {
  /**
   * Ідентифікатор компанії
   * @example "f04030e9-fc19-44cf-80eb-68b7bff4841d"
   */
  id: string;
  /**
   * Найменування компанії
   * @example "Hubber"
   */
  name?: string;
  /**
   * Статус компанії
   * @example "new"
   */
  statusCode:
    | "new"
    | "active"
    | "blocked"
    | "blocked_by_balance"
    | "contract_terminated";
  /**
   * Ідентифікатор власника компанії
   * @example "f04030e9-fc19-44cf-80eb-68b7bff4841d"
   */
  ownerId: string;
  /**
   * Оновлено
   * @maxLength 255
   * @example "f04030e9-fc19-44cf-80eb-68b7bff4841d"
   */
  updatedBy: string | null;
  /**
   * Версія ресурсу
   * @example 1
   */
  version: number;
  /**
   * Створено в дату й час
   * @example "2020-10-10T19:00:00.000Z"
   */
  createdAt: string;
  /**
   * Оновлено о datetime
   * @example "2020-10-10T19:00:00.000Z"
   */
  updatedAt: string | null;
  /**
   * Ідентифікатор тарифу компанії
   * @format uuid
   * @example "7e4ae1c7-8f0b-4bd2-a7a4-efa8796cea2e"
   */
  tariffId?: string;
  /**
   * Ідентифікатор файлу логотипу
   * @example "dd6aeb48-0051-40f8-ab47-6a2ee7cb9fe5"
   */
  logo?: string | null;
  /**
   * ЄДРПО або ІПН компанії
   * @min 8
   * @max 10
   * @example "32855961"
   */
  govNumber?: string | null;
  /**
   * Юридична особа
   * @example "1"
   */
  legalEntityId: number | null;
  /**
   * Тип компанії
   * @example "fop"
   */
  type?: "fop" | "tov" | "pp" | null;
  /**
   * Значення IBAN компанії
   * @example "UA593510050000026201111111111"
   */
  iban?: string | null;
  /**
   * Ідентифікатор відповідального менеджера
   * @example "24"
   */
  responsibleId?: string | null;
  /**
   * Юридична назва компанії/фізичної особи-підприємця
   * @example "Legal Corp"
   */
  legalName?: string;
  /**
   * Номер контракта
   * @example "0000000000000000"
   */
  contractNumber?: string;
  /**
   * Дата договору:
   * @example "2018-02-13T21:02:07.000Z"
   */
  contractDate?: string;
  /**
   * Номер посвідчення особи (застосовується лише для фізичних осіб-підприємців)
   * @example "000000000 OR АА0000"
   */
  identityNumber?: string;
  /**
   * Дата видачі посвідчення особи (застосовується лише для фізичних осіб-підприємців)
   * @example "2018-02-13T21:02:07.000Z"
   */
  identityIssuedDate?: string;
  /**
   * Посвідчення особи, видане (застосовується лише для фізичних осіб-підприємців)
   * @example "1234"
   */
  identityIssuedBy?: string;
  /**
   * Адреса місцезнаходження
   * @example "Наддніпрянське"
   */
  legalAddressCity?: string;
  /**
   * Юридична адреса вул.
   * @example "Парковая аллея"
   */
  legalAddressStreet?: string;
  /**
   * Юридична адреса номер будинку
   * @example "9 3/4"
   */
  legalAddressHouseNumber?: string;
  /**
   * Юридична адреса офіс/квартира номер
   * @example "11"
   */
  legalAddressOffice?: string;
  /**
   * Юридична адреса поштовий індекс
   * @example "01000"
   */
  legalAddressPostalCode?: string;
  /** Файли документів компанії */
  files?: CompanyFile[];
  /**
   * Адреса компанії в місті або регіоні
   * @deprecated
   * @maxLength 255
   * @example "вул. Джобса 1"
   */
  address?: string | null;
  /**
   * Місто або регіон компанії
   * @deprecated
   * @maxLength 255
   * @example "Наддніпрянське"
   */
  location?: string | null;
  mainAccount: CompanyMainAccount | null;
  bonusAccount: CompanyBonusAccount | null;
  responsible?: {
    /** @example "Ivan" */
    firstName: string;
    /** @example "Ivanovich" */
    lastName: string | null;
    /** @example "test@test.com" */
    email: string;
    /** @example 1234567890 */
    phone: string | null;
  };
  shipment_settings?: DeliveryShipments;
  /**
   * Критичний доступний рівень балансу
   * @example 100
   */
  criticalLimit?: number | null;
  feature: CompanyFeatureReadModel;
  /** @example true */
  trusted: boolean;
  isActive?: boolean;
  /**
   * Контент-менеджер
   * @example 100
   */
  contentManagerId?: number | null;
  isPrepayment?: boolean;
  /**
   * Дата і час останньої зміни статусу
   * @example "2020-10-10T19:00:00.000Z"
   */
  lastChangedAt?: string | null;
  isQuestionsActive?: boolean;
}

export interface CompanyMainAccount {
  /**
   * Доступний залишок
   * @format float
   * @example 1000
   */
  balance: number;
  /**
   * Утримана сума
   * @format float
   * @example 10
   */
  hold: number;
  /**
   * Підсумковий баланс
   * @format float
   * @example 1010
   */
  total: number;
}

export interface CompanyBonusAccount {
  /**
   * Доступний залишок
   * @format float
   * @example 1000
   */
  balance: number;
  /**
   * Утримана сума
   * @format float
   * @example 10
   */
  hold: number;
  /**
   * Підсумковий баланс
   * @format float
   * @example 1010
   */
  total: number;
}

export interface DeliveryShipments {
  /**
   * @format uuid
   * @example "aa6682d3-ce98-4bea-80bd-20205dc63195"
   */
  company_id?: string;
  /** @example "345" */
  category_id?: string | null;
  /** @example "962" */
  external_category_id?: string | null;
  shipments?: DeliveryShipment[];
  type?: DeliveryType;
  /** @example "2018-02-13T21:02:07.000Z" */
  created_at?: string;
  /** @example "2018-02-13T21:02:07.000Z" */
  updated_at?: string;
  category?: {
    /** @example 123 */
    id?: number;
    /** @example "52c783d1-5811-4c92-8d05-1ba05c31143a" */
    externalId?: string;
    /** @example "Название категории" */
    title?: string;
    /** @example "dignissimos" */
    slug?: string;
    /** @example 120 */
    parentId?: number;
    /** @example "2020-10-10T19:00:00.000Z" */
    createdAt?: string;
    /** @example "2020-10-10T19:00:00.000Z" */
    updatedAt?: string;
    /**
     * Визначте, чи є категорія віртуальною чи реальною
     * @example false
     */
    special?: boolean;
    /**
     * Показує або приховує категорію
     * @example true
     */
    visible?: boolean;
  } & {
    attributeSets?: AttributeSetItemV2[];
  };
}

export interface DeliveryShipment {
  /** @example "ukrposhta" */
  provider: "nova_poshta" | "ukrposhta" | "pickup";
  /** @example true */
  enabled: boolean;
  options: DeliveryOption[];
  /** @example 14 */
  delivery_period?: number | null;
  /** @example "2018-02-13T21:02:07.000Z" */
  created_at?: string;
  /** @example "2018-02-13T21:02:07.000Z" */
  updated_at?: string;
}

export interface DeliveryOption {
  /**
   * Назва варіантів доставки відправлення:
   *   * `free_shipment` - Безкоштовна доставка за вартістю товару
   *   * `free_shipment_order_total` - Безкоштовна доставка по сумме заказа
   */
  name?: ShipmentOptionName;
  /** @example true */
  enabled?: boolean;
  /** @example 42 */
  threshold?: number;
}

/** @example "company" */
export enum DeliveryType {
  Default = "default",
  Company = "company",
  Category = "category",
}

/**
 * Тип постачальника
 * @example "nova_poshta"
 */
export enum DeliveryProvider {
  NovaPoshta = "nova_poshta",
  Ukrposhta = "ukrposhta",
  Pickup = "pickup",
  Meest = "meest",
}

export type DeliverySettlement =
  | {
      /**
       * @format uuid
       * @example "aa6682d3-ce98-4bea-80bd-20205dc63195"
       */
      id?: string;
      /** @example "Київ" */
      title?: string;
      /** @example false */
      disabled?: boolean;
    }
  | {
      /**
       * @format uuid
       * @example "aa6682d3-ce98-4bea-80bd-20205dc63195"
       */
      id?: string;
      /** @example 42 */
      city_id?: number;
      /** @example 42 */
      district_id?: number;
      /** @example 42 */
      region_id?: number;
      /** @example "Переліски - Вінницька обл. - Барський р-н" */
      title?: string;
      /** @example "Барський" */
      district?: string;
      /** @example "Вінницька" */
      region?: string;
      /** @example "Переліски" */
      city?: string;
    }
  | {
      /**
       * @format uuid
       * @example "aa6682d3-ce98-4bea-80bd-20205dc63195"
       */
      id?: string;
      /** @example "Переліски - Вінницька обл. - Барський р-н" */
      title?: string;
    }
  | {
      /**
       * @format uuid
       * @example "aa6682d3-ce98-4bea-80bd-20205dc63195"
       */
      id: string;
      /**
       * @format uuid
       * @example "aa6682d3-ce98-4bea-80bd-20205dc63195"
       */
      external_Id: string;
      /** @example "Київ" */
      title: string;
    };

export type DeliveryOffice =
  | {
      /**
       * @format uuid
       * @example "a7dd8890-00f7-4313-84d0-c07c094d0b49"
       */
      id?: string;
      /** @example "Відділення №100 (до 30 кг на одне місце): вул. Інженерна, 1 (маг. "Фуршет")" */
      title?: string;
      /** @example "Київ, Інженерна, 1" */
      address?: string;
      /** @example false */
      disabled?: boolean;
    }
  | {
      /**
       * @format uuid
       * @example "a7dd8890-00f7-4313-84d0-c07c094d0b49"
       */
      id?: string;
      /** @example 42 */
      city_id?: number;
      /** @example 42 */
      district_id?: number;
      /** @example 42 */
      region_id?: number;
      /** @example "Переліски - Вінницька обл. - Барський р-н" */
      title?: string;
      /** @example "Барський" */
      district?: string;
      /** @example "Вінницька" */
      region?: string;
      /** @example "Переліски" */
      city?: string;
    }
  | {
      /**
       * @format uuid
       * @example "aa6682d3-ce98-4bea-80bd-20205dc63195"
       */
      id?: string;
      /**
       * @format uuid
       * @example "aa6682d3-ce98-4bea-80bd-20205dc63195"
       */
      company_id?: string;
      /** @example "https://exmaple.com/xxx" */
      map_url?: string;
      /** @example "380661112233" */
      phone?: string;
      /** @example "https://exmaple.com/123.jpg" */
      photo?: string;
      /** @example "Название" */
      title?: string;
      address_translations?: {
        /** @example "ru" */
        locale?: "ru" | "ua";
        /** @example "Адрес" */
        value?: string;
      }[];
      schedule?: {
        /** @example "mon" */
        day?: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
        /** @example true */
        enabled?: boolean;
        /** @example "08:00" */
        from?: string;
        /** @example "20:00" */
        to?: string;
      }[];
      settlement?: {
        /** @example "00021186-acfc-4fec-8a41-b2da2a2a0d64" */
        id?: string;
        /** @example "Киенка - Черниговская обл. - Черниговский р-н" */
        title?: string;
      };
    }
  | {
      /**
       * @format uuid
       * @example "a7dd8890-00f7-4313-84d0-c07c094d0b49"
       */
      id: string;
      /**
       * @format uuid
       * @example "a7dd8890-00f7-4313-84d0-c07c094d0b49"
       */
      settlement_id: string;
      /**
       * @format uuid
       * @example "a7dd8890-00f7-4313-84d0-c07c094d0b49"
       */
      externalId: string;
      /** @example "Відділення №100 (до 30 кг на одне місце): вул. Інженерна, 1 (маг. "Фуршет")" */
      title?: string;
      /** @example "Київ, Інженерна, 1" */
      address: string;
      /**
       * @format decimal
       * @example 42.99
       */
      latitude: number;
      /**
       * @format decimal
       * @example 42.99
       */
      longitude: number;
    };

export interface PickupPointRead {
  /**
   * @format uuid
   * @example "aa6682d3-ce98-4bea-80bd-20205dc63195"
   */
  id?: string;
  /**
   * @format uuid
   * @example "aa6682d3-ce98-4bea-80bd-20205dc63195"
   */
  company_id?: string;
  /** @example "https://exmaple.com/xxx" */
  map_url?: string;
  /** @example "380661112233" */
  phone?: string;
  /** @example "https://exmaple.com/123.jpg" */
  photo?: string;
  /** @example "Название" */
  title?: string;
  /** @example true */
  enabled?: boolean;
  /** @example false */
  is_draft?: boolean;
  address_translations?: {
    /** @example "ru" */
    locale?: "ru" | "ua";
    /** @example "Адрес" */
    value?: string;
  }[];
  schedule?: Schedule[];
  /** @example "00021186-acfc-4fec-8a41-b2da2a2a0d64" */
  settlement_id?: string;
  settlement_translations?: {
    /** @example "ru" */
    locale?: "ru" | "ua";
    /** @example "Киенка" */
    value?: string;
  }[];
}

export interface Schedule {
  /** @example "mon" */
  day?: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
  /** @example true */
  enabled?: boolean;
  /** @example "08:00" */
  from?: string;
  /** @example "20:00" */
  to?: string;
}

/**
 * Назва валюти:
 *   * `USD` -доллар
 *   * `UAH` - гривня
 * @example "USD"
 */
export enum Currency {
  USD = "USD",
  UAH = "UAH",
}

export interface CurrencySettingsReadModel {
  currencyRates?: {
    /**
     * Значення курсу валюти
     * @example 37.8
     */
    rate?: number;
    /**
     * Назва валюти:
     *   * `USD` -доллар
     *   * `UAH` - гривня
     */
    currency?: Currency;
  }[];
  currencyConversion?: boolean;
}

export interface Order {
  /**
   * ID замовлення
   * @format uuid
   * @example "dec9761c-9ed0-403f-a01a-5e25154ebcab"
   */
  id: string;
  /**
   * Ідентифікатор замовлення із зовнішньої системи
   * @example "888888"
   */
  externalId?: string | null;
  /**
   * @format uuid
   * @example "1e0ca935-a61d-41bc-9bd3-8c2833b72f6d"
   */
  companyId: string;
  /** @example 2 */
  legalEntityId: number;
  /** @example true */
  trustedCompany?: boolean;
  /** @example "6d9244a1-3c41-4568-acf9-144ebf634705" */
  customerId: string | null;
  assignee?: OrderAssignee;
  /** @example "text comment" */
  comment?: string;
  /** @example 42 */
  commentsCount: number;
  /**
   * Номер замовлення
   * @example "1000000373"
   */
  number: string;
  /** @example "2020-05-20T05:35:11.000Z" */
  createdAt: string;
  /** @example "2020-05-20T05:35:12.000Z" */
  updatedAt?: string;
  /**
   * Типи замовлень:
   *  * `new` - Новий
   *  * `confirmed_by_merchant` - Підтверджено продавцем
   *  * `confirmed` - Підтверджений
   *  * `sent` - Відправлено
   *  * `delivered` - Готовий до видачі
   *  * `completed` - Завершено
   *  * `closed` - Закрито
   *  * `Canceled` - Скасовано
   *  * `returned` - Повернутий
   *  * `return_requested` - Запит на повернення
   *  * `canceled_by_merchant` - Скасовано продавцем
   *  * `completed_merchant_rejection` - Завершено (Відмова продавця)
   *  * `closed_merchant_rejection` - Закрито (Відмова продавця)
   */
  statusCode: OrderStatus;
  callStatus?: OrderCallStatus | null;
  /**
   * @format decimal
   * @example 1201.5
   */
  subtotal: number;
  /** @example true */
  payed: boolean;
  /** @example true */
  skipCustomerContact: boolean;
  items: OrderProductsItem[];
  address: OrderAddress;
  cancel: {
    /**
     * Типи замовлень:
     *  * `new` - Новий
     *  * `confirmed_by_merchant` - Підтверджено продавцем
     *  * `confirmed` - Підтверджений
     *  * `sent` - Відправлено
     *  * `delivered` - Готовий до видачі
     *  * `completed` - Завершено
     *  * `closed` - Закрито
     *  * `Canceled` - Скасовано
     *  * `returned` - Повернутий
     *  * `return_requested` - Запит на повернення
     *  * `canceled_by_merchant` - Скасовано продавцем
     *  * `completed_merchant_rejection` - Завершено (Відмова продавця)
     *  * `closed_merchant_rejection` - Закрито (Відмова продавця)
     */
    previousStatusCode?: OrderStatus;
    /**
     * Ініціатори:
     *   * `call_center` - Колл-центр
     *   * `customer` - Покупатель
     *   * `merchant` - Продавець
     */
    initiatorCode?: InitiatorCode;
    /**
     * Причини:
     *   * `order_NOT_actual` - Замовлення вже не актуален для покупця
     *   * `product_not_available` - Товара немає в наявності
     *   * `price_differs` - ціна в заказе не відповідає актуальній ціні
     *   * `delivery_not_available` - Продавець не здійснює доставку в регіон покупця
     */
    reasonCode?: ReasonCode;
    /** @example "text comment" */
    comment?: string;
    /** @example "order.customer_cancel_reason.customer_changed_mind" */
    reasonTranslationKey?: string;
    /** @example "2020-05-20T05:35:11.000Z" */
    createdAt?: string;
  } | null;
  /** Додаткове помешкання, приєднане до mas-service */
  company: Company | null;
  /** Налаштування відправлення для компанії */
  company_shipments?: DeliveryShipments | null;
  /** Налаштування оплати для компанії */
  company_payments?: {
    /**
     * Ідентифікатор документа
     * @example "f04030e9-fc19-44cf-80eb-68b7bff4841d"
     */
    id?: string;
    /**
     * Ідентифікатор компанії
     * @example "f04030e9-fc19-44cf-80eb-68b7bff48410"
     */
    company_id?: string;
    deliveries?: {
      /**
       * Ідентифікатор документа
       * @example "f04030e9-fc19-44cf-80eb-68b7bff4841d"
       */
      id?: string;
      /** @example "ukrposhta" */
      provider?: "nova_poshta" | "ukrposhta" | "pickup";
      payments?: {
        /**
         * Ідентифікатор документа
         * @example "f04030e9-fc19-44cf-80eb-68b7bff4841d"
         */
        id?: string;
        provider?: any;
        enabled?: boolean;
        /** @example 1.2 */
        commission?: number;
        /** @example 10 */
        view_order?: number;
      }[];
    }[];
    is_default?: boolean;
  } | null;
  /** Додаткове помешкання, приєднане до служби доставки */
  settlement: DeliverySettlement | null;
  /** Додаткове помешкання, приєднане до служби доставки */
  office: DeliveryOffice | null;
}

export interface OrderV3 {
  /**
   * Order id
   * @format uuid
   * @example "dec9761c-9ed0-403f-a01a-5e25154ebcab"
   */
  id: string;
  /**
   * Order id from external system
   * @example "888888"
   */
  externalId?: string | null;
  /**
   * @format uuid
   * @example "1e0ca935-a61d-41bc-9bd3-8c2833b72f6d"
   */
  companyId: string;
  /** @example 2 */
  legalEntityId: number;
  /** @example true */
  trustedCompany?: boolean;
  /**
   * @format uuid
   * @example "6d9244a1-3c41-4568-acf9-144ebf634705"
   */
  customerId: string | null;
  assignee?: OrderAssignee;
  /** @example "text comment" */
  comment?: string;
  /** @example 42 */
  commentsCount: number;
  /**
   * Order Number
   * @example "1000000373"
   */
  number: string;
  /**
   * @format date-time
   * @example "2020-05-20T05:35:11.000Z"
   */
  createdAt: string;
  /**
   * @format date-time
   * @example "2020-05-20T05:35:12.000Z"
   */
  updatedAt?: string;
  /**
   * Типи замовлень:
   *  * `new` - Новий
   *  * `confirmed_by_merchant` - Підтверджено продавцем
   *  * `confirmed` - Підтверджений
   *  * `sent` - Відправлено
   *  * `delivered` - Готовий до видачі
   *  * `completed` - Завершено
   *  * `closed` - Закрито
   *  * `Canceled` - Скасовано
   *  * `returned` - Повернутий
   *  * `return_requested` - Запит на повернення
   *  * `canceled_by_merchant` - Скасовано продавцем
   *  * `completed_merchant_rejection` - Завершено (Відмова продавця)
   *  * `closed_merchant_rejection` - Закрито (Відмова продавця)
   */
  statusCode: OrderStatus;
  callStatus: OrderCallStatus | null;
  /**
   * @format decimal
   * @example 1201.5
   */
  subtotal: number;
  /** @example true */
  payed: boolean;
  /** @example true */
  skipCustomerContact: boolean;
  items: OrderProductsItem[];
  address: OrderAddressV3;
  cancel: {
    /**
     * Типи замовлень:
     *  * `new` - Новий
     *  * `confirmed_by_merchant` - Підтверджено продавцем
     *  * `confirmed` - Підтверджений
     *  * `sent` - Відправлено
     *  * `delivered` - Готовий до видачі
     *  * `completed` - Завершено
     *  * `closed` - Закрито
     *  * `Canceled` - Скасовано
     *  * `returned` - Повернутий
     *  * `return_requested` - Запит на повернення
     *  * `canceled_by_merchant` - Скасовано продавцем
     *  * `completed_merchant_rejection` - Завершено (Відмова продавця)
     *  * `closed_merchant_rejection` - Закрито (Відмова продавця)
     */
    previousStatusCode: OrderStatus;
    /**
     * Ініціатори:
     *   * `call_center` - Колл-центр
     *   * `customer` - Покупатель
     *   * `merchant` - Продавець
     */
    initiatorCode: InitiatorCode;
    /**
     * Причини:
     *   * `order_NOT_actual` - Замовлення вже не актуален для покупця
     *   * `product_not_available` - Товара немає в наявності
     *   * `price_differs` - ціна в заказе не відповідає актуальній ціні
     *   * `delivery_not_available` - Продавець не здійснює доставку в регіон покупця
     */
    reasonCode: ReasonCode;
    /** @example "text comment" */
    comment: string;
    /** @example "order.customer_cancel_reason.customer_changed_mind" */
    reasonTranslationKey: string;
    /** @example "2020-05-20T05:35:11.000Z" */
    createdAt: string;
  } | null;
  /** Optional property joined from mas-service */
  company: Company | null;
  /** Shipment settings for company */
  company_shipments?: DeliveryShipments | null;
  /** Payment settings for company */
  company_payments?: any;
  /** Optional property joined from delivery-service */
  settlement: DeliverySettlement | null;
  /** Optional property joined from delivery-service */
  office: DeliveryOffice | null;
  /** @example true */
  hasSurveyResult: boolean;
}

export interface OrderAllowedStatus {
  /**
   * Типи замовлень:
   *  * `new` - Новий
   *  * `confirmed_by_merchant` - Підтверджено продавцем
   *  * `confirmed` - Підтверджений
   *  * `sent` - Відправлено
   *  * `delivered` - Готовий до видачі
   *  * `completed` - Завершено
   *  * `closed` - Закрито
   *  * `Canceled` - Скасовано
   *  * `returned` - Повернутий
   *  * `return_requested` - Запит на повернення
   *  * `canceled_by_merchant` - Скасовано продавцем
   *  * `completed_merchant_rejection` - Завершено (Відмова продавця)
   *  * `closed_merchant_rejection` - Закрито (Відмова продавця)
   */
  code?: OrderStatus;
  title?: string;
}

export type OrderChangeStatusWriteModel =
  | OrderCancelWriteModel
  | OrderSentWriteModel;

export interface OrderCancelWriteModel {
  reason_code: string;
  comment?: string;
  /** @example "order.customer_cancel_reason.customer_get_loan_is_preferred_payment_type" */
  translationKey:
    | "order.cancel_reason.order_not_actual"
    | "order.cancel_reason.product_not_available"
    | "order.cancel_reason.price_differs"
    | "order.cancel_reason.delivery_not_available"
    | "order.cancel_reason.customer_refused_at_office"
    | "order.cancel_reason.product_not_available_from_seller"
    | "order.customer_cancel_reason.customer_failed_to_contact"
    | "order.customer_cancel_reason.customer_failed_to_contact_merchant"
    | "order.customer_cancel_reason.customer_price_obsoleted"
    | "order.customer_cancel_reason.customer_found_cheaper"
    | "order.customer_cancel_reason.customer_shop_pickup_preferred_delivery_price_too_high"
    | "order.customer_cancel_reason.customer_delivery_speed_too_slow"
    | "order.customer_cancel_reason.customer_delivery_type_is_not_suitable"
    | "order.customer_cancel_reason.customer_product_characteristics_are_not_suitable"
    | "order.customer_cancel_reason.customer_several_packages_delivery_payment_is_not_suitable"
    | "order.customer_cancel_reason.customer_credit_card_payment_is_preferred"
    | "order.customer_cancel_reason.customer_get_loan_is_preferred_payment_type"
    | "order.customer_cancel_reason.customer_account_payment_with_vat_is_preferred"
    | "order.customer_cancel_reason.customer_account_payment_without_vat_is_preferred"
    | "order.customer_cancel_reason.customer_order_duplicate"
    | "order.customer_cancel_reason.customer_epic_warranty_is_preferred"
    | "order.customer_cancel_reason.customer_changed_mind"
    | "order.customer_cancel_reason.customer_canceled_at_delivery_office"
    | "order.customer_cancel_reason.customer_no_payment"
    | "order.customer_cancel_reason.customer_prepayment_required"
    | "order.customer_cancel_reason.customer_long_cc_confirmation"
    | "order.customer_cancel_reason.customer_long_merchant_confirmation"
    | "order.customer_cancel_reason.customer_dissatisfied_with_the_shipping_cost"
    | "order.customer_cancel_reason.customer_test"
    | "order.customer_cancel_reason.customer_bought_elsewhere_as_a_gift"
    | "order.customer_cancel_reason.customer_not_timely_confirmation_of_the_availability_of_goods"
    | "order.customer_cancel_reason.customer_requires_advance_payment_which_is_not_indicated_on_the_website"
    | "order.merchant_cancel_reason.merchant_product_is_not_available"
    | "order.merchant_cancel_reason.merchant_price_obsoleted"
    | "order.merchant_cancel_reason.merchant_product_is_defective"
    | "order.customer_cancel_reason.customer_wanted_to_check_product"
    | "order.customer_cancel_reason.customer_shop_pickup_preferred_delivery_speed_too_slow"
    | "order.customer_cancel_reason.customer_other_reason"
    | "order.customer_cancel_reason.customer_not_completed_within_the_specified_time"
    | "order.customer_cancel_reason.customer_too_late_contact";
}

export interface OrderSentWriteModel {
  /**
   * Постачальник відправлень
   * @example "nova_poshta"
   */
  provider:
    | "nova_poshta"
    | "ukrposhta"
    | "pickup"
    | "meest"
    | "cvz_epicentr"
    | "parcel_box_epicentr";
  /**
   * Номер відправлення
   * @example "100321569875"
   */
  number: string;
}

export interface ShipmentInput {
  /**
   * ID міста постачальника доставки
   * @format uuid
   * @example "42404049-cc5a-4da9-ad4c-9b9096c2bed2"
   */
  settlementId: string;
  /**
   * ID поштового відділення постачальника доставки
   * @format uuid
   * @example "42404049-cc5a-4da9-ad4c-9b9096c2bed2"
   */
  officeId: string;
  paymentProvider?: "pay_on_pickup" | "pay_on_delivery" | "easypay";
}

export interface ShipmentNumberInput {
  /**
   * Номер відправлення
   * @example "100321569875"
   */
  number: string;
}

/**
 * Назва варіантів доставки відправлення:
 *   * `free_shipment` - Безкоштовна доставка за вартістю товару
 *   * `free_shipment_order_total` - Безкоштовна доставка по сумме заказа
 * @example "free_shipment"
 */
export enum ShipmentOptionName {
  FreeShipment = "free_shipment",
  FreeShipmentOrderTotal = "free_shipment_order_total",
}

/**
 * Типи замовлень:
 *  * `new` - Новий
 *  * `confirmed_by_merchant` - Підтверджено продавцем
 *  * `confirmed` - Підтверджений
 *  * `sent` - Відправлено
 *  * `delivered` - Готовий до видачі
 *  * `completed` - Завершено
 *  * `closed` - Закрито
 *  * `сanceled` - Скасовано
 *  * `returned` - Повернутий
 *  * `return_requested` - Запит на повернення
 *  * `canceled_by_merchant` - Скасовано продавцем
 *  * `completed_merchant_rejection` - Завершено (Відмова продавця)
 *  * `closed_merchant_rejection` - Закрито (Відмова продавця)
 * @example "sent"
 */
export enum OrderStatus {
  New = "new",
  ConfirmedByMerchant = "confirmed_by_merchant",
  Confirmed = "confirmed",
  Sent = "sent",
  Delivered = "delivered",
  Completed = "completed",
  Closed = "closed",
  Canceled = "canceled",
  Returned = "returned",
  ReturnRequested = "return_requested",
  CanceledByMerchant = "canceled_by_merchant",
  CompletedMerchantRejection = "completed_merchant_rejection",
  ClosedMerchantRejection = "closed_merchant_rejection",
}

export interface OrderCallStatusInput {
  callStatus: OrderCallStatus;
}

/** @example "success" */
export enum OrderCallStatus {
  Success = "success",
  FirstFail = "first_fail",
  SecondFail = "second_fail",
  EmailSent = "email_sent",
}

export interface OrderItemInput {
  /** @example 3 */
  quantity: number;
}

export interface OrderItemAdd {
  /** @example "2365141" */
  productId: string;
}

export interface OrderItem {
  /**
   * @format uuid
   * @example "42404049-cc5a-4da9-ad4c-9b9096c2bed2"
   */
  offerId?: string;
  /** @example 3 */
  quantity?: number;
  /** @example "https://test.domain/product" */
  url?: string;
}

export interface OrderClientData {
  /** @example "John" */
  firstName: string;
  /** @example "Galt" */
  lastName: string;
  /** @example "Willson" */
  patronymic?: string;
  /** @example "test@test.com" */
  email: string;
  /** @example "380661112233" */
  phone: string;
}

export interface OrderProductsItem {
  /**
   * @format uuid
   * @example "42404049-cc5a-4da9-ad4c-9b9096c2bed1"
   */
  offerId: string;
  /** @example "16" */
  productId: string;
  /** @example "42404049-cc5a-4da9-ad4c-9b9096c2bed1" */
  productExternalId?: string;
  /** @example "AASD31231231233" */
  sku: string;
  /** @example "My wonderful product" */
  title: string;
  /** @example "https://test.domain/pic.jpg" */
  image?: string;
  /** @example "https://test.domain/product" */
  url?: string;
  /**
   * @format decimal
   * @example 400.5
   */
  price: number;
  /** @example 3 */
  quantity: number;
  /**
   * @format decimal
   * @example 1201.5
   */
  subtotal?: number;
  /**
   * Вимірювання продукту
   * @example "шт."
   */
  measure: string | null;
  /** Співвідношення продуктів */
  ratio: number;
  product?: ProductItem;
}

export type OrderListModel = PaginatedCursorCollection & {
  /** -- СПИСОК ПРЕДМЕТІВ */
  items: Order[];
};

export type OrderListTotalModel = CursorCollection & {
  /**
   * Загальна сума списку замовлень
   * @example 1250
   */
  total: number;
};

export interface OrderAddress {
  /** @example "John" */
  firstName?: string;
  /** @example "Galt" */
  lastName?: string;
  /** @example "Willson" */
  patronymic?: string;
  /** @example "test@test.com" */
  email?: string;
  /** @example "380661112233" */
  phone?: string;
  shipment?: OrderShipment;
}

export interface OrderAddressV3 {
  /** @example "John" */
  firstName: string;
  /** @example "Galt" */
  lastName: string;
  /** @example "Willson" */
  patronymic?: string;
  /** @example "test@test.com" */
  email: string;
  /** @example "380661112233" */
  phone: string;
  shipment: OrderShipment;
  /** @example true */
  isAlternateRecipient: boolean;
  recipient: {
    /** @example "John" */
    firstName: string;
    /** @example "Galt" */
    lastName: string;
    /** @example "Willson" */
    patronymic?: string;
    /** @example "380661112233" */
    phone: string;
  };
}

export interface OrderShipment {
  /** Тип постачальника */
  provider?: DeliveryProvider | null;
  paymentProvider?: any;
  paymentStatus?:
    | "none"
    | "payment_waiting"
    | "payment_canceled"
    | "hold_set"
    | "hold_unset"
    | "hold_canceled";
  /**
   * ID міста постачальника доставки
   * @format uuid
   * @example "42404049-cc5a-4da9-ad4c-9b9096c2bed1"
   */
  settlementId?: string | null;
  /**
   * ID поштового відділення постачальника доставки
   * @format uuid
   * @example "42404049-cc5a-4da9-ad4c-9b9096c2bed1"
   */
  officeId?: string | null;
  /** @example "1234567890" */
  number?: string | null;
  /** @example true */
  isFree?: boolean;
  /** @example true */
  autogenerated?: boolean;
  /**
   * @format decimal
   * @example 42.99
   */
  deliveryPrice?: number;
}

export interface OrderAssignee {
  /** @example "John" */
  firstName: string;
  /** @example "Doe" */
  lastName: string;
  /** @example "http://example.com/avatar.jpg" */
  avatar: string;
  /** @example "42" */
  userId: string;
}

/**
 * Причини:
 *   * `order_NOT_actual` - Замовлення вже не актуален для покупця
 *   * `product_not_available` - Товара немає в наявності
 *   * `price_differs` - ціна в заказе не відповідає актуальній ціні
 *   * `delivery_not_available` - Продавець не здійснює доставку в регіон покупця
 * @example "order_not_actual"
 */
export enum ReasonCode {
  OrderNotActual = "order_not_actual",
  ProductNotAvailable = "product_not_available",
  PriceDiffers = "price_differs",
  DeliveryNotAvailable = "delivery_not_available",
}

export interface OrderCancelReason {
  /** @example "order_not_actual" */
  code?: string;
  /**
   * скасувати назву причини
   * @example "Заказ уже не актуален для покупателя"
   */
  title?: string;
  /** @example "order.cancel_reason.order_not_actual" */
  translationKey?: string;
}

/**
 * Ініціатори:
 *   * `call_center` - Колл-центр
 *   * `customer` - Покупатель
 *   * `merchant` - Продавець
 * @example "call_center"
 */
export enum InitiatorCode {
  CallCenter = "call_center",
  Customer = "customer",
  Merchant = "merchant",
}

export type OrderShipping =
  | CompanyShippingFull
  | PrivateEntrepreneurShippingFull;

export interface CompanyShippingFull {
  /**
   * ID міста постачальника доставки
   * @format uuid
   * @example "42404049-cc5a-4da9-ad4c-9b9096c2bed2"
   */
  settlementId: string;
  /**
   * ID поштового відділення постачальника доставки
   * @format uuid
   * @example "42404049-cc5a-4da9-ad4c-9b9096c2bed2"
   */
  officeId: string;
  /** @example "company" */
  companyType?: "private_entrepreneur" | "company";
  firstName: string;
  lastName: string;
  phone: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  /** @example 1234567890 */
  egrpou: string;
  /** @example "UA413052990000026009050233326" */
  iban: string;
}

export interface PrivateEntrepreneurShippingFull {
  /**
   * ID міста постачальника доставки
   * @format uuid
   * @example "42404049-cc5a-4da9-ad4c-9b9096c2bed2"
   */
  settlementId: string;
  /**
   * ID поштового відділення постачальника доставки
   * @format uuid
   * @example "42404049-cc5a-4da9-ad4c-9b9096c2bed2"
   */
  officeId: string;
  /** @example "private_entrepreneur" */
  companyType?: "private_entrepreneur" | "company";
  firstName: string;
  lastName: string;
  phone: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  /** @example 12345678 */
  inn: string;
}

export interface ProductItemBase {
  /** @example 123 */
  id: number;
  /** Статус */
  status: ProductStatusCode;
  /**
   * URL-адреса slug
   * @example "mplc-eksperiment-1eb356a2-fc6d-6570-963a-d7160c9bc022"
   */
  slug?: string;
  /**
   * Повнота
   * @example 50
   */
  completeness?: number;
  /**
   * Ідентифікатор моделі
   * @example 2078674
   */
  modelId?: number;
  media?: ProductMediaV2[];
  /** Id Статусу продукту */
  statusId: ProductStatusId;
  attributeSet?: AttributeSetItemV2;
  company?: Company;
  currency_settings?: CurrencySettingsReadModel;
  /** Категорії товару */
  categories?: ProductCategoryV2[];
  availabilityTransitions?: string[];
  permissions?: string[];
  /** @example "2020-10-15T15:38:58+0000" */
  createdAt?: string;
  /** @example "2020-10-15T15:38:58+0000" */
  updatedAt?: string;
  /** @example "2020-10-15T15:38:58+0000" */
  publishedAt?: string;
  /**
   * Артикул
   * @example "SD00038633|12345"
   */
  sku?: string;
  offer?: ProductOffer;
  /** Назва товару */
  translations: ProductTranslationRead[];
  /** @example 1899 */
  attributeSetCode?: string;
  /** @example "ce4de88e-7515-442c-9fae-dd5c4aa3eb10" */
  companyId: string;
  /** @example false */
  productInPromotion?: boolean;
  /** @example 1 */
  price?: number;
  /** @example 100 */
  availability?: number;
}

export type ProductItem = ProductItemBase & {
  attributeValues?: (
    | ProductAttributeValueBoolean
    | ProductAttributeValueFloat
    | ProductAttributeValueInteger
    | ProductAttributeValueMultiselect
    | ProductAttributeValueSelect
    | ProductAttributeValueString
    | ProductAttributeValueText
    | ProductAttributeValueArray
  )[];
  /** Массив похожих товарів */
  similarProducts?: ProductSimilarProduct[];
  productInPromotion?: boolean;
  /** @example false */
  isPrepayment?: boolean;
};

export interface ProductOfferBase {
  prices: {
    /** Тип ціни */
    type?: "price" | "old_price";
    /**
     * Розмір:
     * @example 120.1
     */
    value?: number;
    /**
     * Перетворене значення
     * @example 120.1
     */
    convertedValue?: number;
    /**
     * Назва валюти:
     *   * `USD` -доллар
     *   * `UAH` - гривня
     */
    currency?: Currency;
  }[];
}

export type ProductOffer = ProductOfferBase & {
  /**
   * Ідентифікатор пропозиції
   * @example "f04030e9-fc19-44cf-80eb-68b7bff4841d"
   */
  id: string;
  availability: {
    /**
     * Внутрішня назва вільних дат
     * @example "in_stock"
     */
    name?: string;
    /**
     * Представлення доступності для кінцевого користувача
     * @example "На складе"
     */
    title?: string;
  };
  /**
   * Активний чи ні
   * @example true
   */
  active: boolean;
  /**
   * Створено
   * @example "2018-02-13T21:02:07.000Z"
   */
  createdAt: string;
  /**
   * Оновлено
   * @example "2018-02-13T21:02:07.000Z"
   */
  updatedAt: string;
};

export interface ProductSimilarProduct {
  /** @example 100232 */
  id: number;
  /**
   * @multipleOf 0.01
   * @example 99.1
   */
  similarity: number;
  /** Масив переводов названих товарів */
  translations?: ProductTranslationRead[];
}

export interface ProductAttributeOptionV2 {
  /** @example 123 */
  id: number;
  /** @example "white" */
  code: string;
  /** @example false */
  deleted?: boolean;
  /**
   * Додаткова інформація
   * @deprecated
   */
  extra?: object;
  /** Масив переводов */
  translations: {
    /**
     * Відображуваний текст
     * @example "Название на русском"
     */
    value: string;
    /**
     * 2-значний код мови (ru|ua)
     * @example "ru"
     */
    languageCode: string;
  }[];
  /**
   * Сортировка
   * @deprecated
   * @example 500
   */
  viewOrder?: number;
  /**
   * Сортировка
   * @example 500
   */
  order: number;
}

export interface AttributeSetItemV2 {
  /** @example 123 */
  id: number;
  /** @example "white" */
  code: string;
  /** Масив переводов */
  translations: ProductTranslationRead[];
  /** @example 120 */
  parentId?: number;
  /**
   * Путь к родительській
   * @example [10]
   */
  path?: number[];
  /** Має дочірні набори атрибутів */
  hasChild?: boolean;
}

/**
 * Параметри фільтра дерева категорій:
 *   * `with_prepayment` - З передоплатою
 *   * `without_prepayment` - Без передоплати
 * @example "without_prepayment"
 */
export enum CategoriesTreeConfigFilter {
  WithPrepayment = "with_prepayment",
  WithoutPrepayment = "without_prepayment",
}

export type ProductCategoryV2 = {
  /** @example 123 */
  id: number;
  /** @example "dignissimos" */
  slug: string;
  /** @example 120 */
  parentId: number;
  /** Путь к родительської категорії */
  path: number[];
  /** Масив переводов */
  translations: ProductTranslationRead[];
  /**
   * Визначте, чи є категорія віртуальною чи реальною
   * @example false
   */
  special?: boolean;
  /**
   * Показує або приховує категорію
   * @example true
   */
  visible?: boolean;
  /**
   * Показує, чи має категорія дочірні категорії
   * @example true
   */
  hasChild?: boolean;
  /** @example false */
  isPrepayment?: boolean;
} & {
  /** @example false */
  isMain: boolean;
  /**
   * Показує, чи ввімкнено передоплату для категорії товару
   * @example true
   */
  isPrepayment?: boolean;
};

export interface ProductMediaV2 {
  /** @example 123 */
  id?: number;
  /** @example "b9b14044-8ee8-435f-9660-76b0ca2b33fc" */
  externalId: string;
  /** @example "https://cdn.epicentrk.ua/products/jSw/FDlSYFwN.jpg" */
  source: string;
  /** @example "https://cdn.epicentrk.ua/products/jSw/FDlSYFwN.jpg" */
  image?: string;
  /** @example "https://cdn.epicentrk.ua/products/jSw/FDlSYFwN.jpg" */
  thumb?: string;
  /** @example true */
  isMain: boolean;
  type: "image" | "image-link" | "3d-image-link";
  /** @example 200 */
  order: number;
}

export interface ProductAttributeValueBase {
  /** @example 123 */
  id?: number;
  /**
   * Код атрибута
   * @example "2345"
   */
  code?: string;
}

export type ProductAttributeValueBoolean = ProductAttributeValueBase & {
  type: "boolean";
  value: boolean;
};

export type ProductAttributeValueArray = ProductAttributeValueBase & {
  type: "array";
  value: string[];
};

export type ProductAttributeValueFloat = ProductAttributeValueBase & {
  type: "float";
  value: number;
};

export type ProductAttributeValueInteger = ProductAttributeValueBase & {
  type: "integer";
  value: number;
};

export type ProductAttributeValueMultiselect = ProductAttributeValueBase & {
  type: "multiselect";
  /** Колекція значень */
  value: string[];
  /** Коллекция опций */
  options?: ProductAttributeOptionV2[];
};

export type ProductAttributeValueSelect = ProductAttributeValueBase & {
  type: "select";
  value: string;
  /** Коллекция опций */
  options?: ProductAttributeOptionV2[];
};

export type ProductAttributeValueString = ProductAttributeValueBase & {
  type: "string";
  value: string;
};

export type ProductAttributeValueText = ProductAttributeValueBase & {
  type: "text";
  /** Масив переводов */
  value: any[];
};

export interface PaginatedCollectionV2 {
  /**
   * Кількість товарів, які потрібно повернути
   * @default 25
   * @example 25
   */
  limit: number;
  /**
   * Кількість елементів, які потрібно пропустити, перш ніж почати збирати набір результатів
   * @example 1
   */
  offset: number;
  /**
   * Кількість повернених предметів
   * @example 1250
   */
  total: number;
}

export enum ProductStatusId {
  Draft = 1,
  Moderating = 2,
  Published = 3,
  Banned = 4,
  Rework = 5,
  New = 6,
  Enrich = 7,
}

export enum ProductStatusCode {
  Draft = "draft",
  Moderating = "moderating",
  Published = "published",
  Banned = "banned",
  Rework = "rework",
  New = "new",
  Enrich = "enrich",
}

export interface ProductTranslationRead {
  /**
   * Відображуваний текст
   * @example "Название на русском"
   */
  title: string;
  /**
   * 2-значний код мови (ru|ua)
   * @example "ru"
   */
  languageCode: string;
}

export interface PaginatedCollection {
  /**
   * Кількість товарів, які потрібно повернути
   * @default 25
   * @example 25
   */
  limit?: number;
  /**
   * Кількість елементів, які потрібно пропустити, перш ніж почати збирати набір результатів
   * @example 1
   */
  offset?: number;
  /**
   * Кількість повернених предметів
   * @example 1250
   */
  total?: number;
}

export interface PaginatedCursorCollection {
  /** Курсор поточної сторінки */
  current?: string;
  /** Курсор наступної сторінки */
  next?: string;
  /** Курсор попередньої сторінки */
  prev?: string;
  /** Курсор останньої сторінки */
  last?: string;
  /**
   * Ліміт. Елементів на сторінку
   * @example 20
   */
  limit?: number;
}

export interface ErrorResponse {
  message?: string;
  code?: number;
}

export interface CollectionResponse {
  /**
   * Кількість повернених предметів
   * @example 1
   */
  total?: number;
}

export interface UuidListParam {
  ids?: string[];
}

export interface Translation {
  /**
   * код мови
   * @example 1
   */
  languageId?: number;
  /**
   * 2-значний код мови
   * @example "ru"
   */
  languageCode: string;
  /**
   * Відображуваний текст
   * @example "Название на русском"
   */
  title: string;
}

export interface JWTToken {
  /**
   * Токен для доступу до захищеної кінцевої точки
   * @example "eyJhbGciOiJSUzI1NiIsI..."
   */
  auth?: string;
  /**
   * Маркер для маркера доступу до оновлення
   * @example "eyJhbGciOiJSUzI1NiIsI..."
   */
  refresh?: string;
}

export interface CompanyFile {
  /**
   * @maxLength 255
   * @example "filename.jpeg"
   */
  fileName?: string;
  /**
   * @maxLength 64
   * @example "dd6aeb48-0051-40f8-ab47-6a2ee7cb9fe5"
   */
  uuid?: string;
}

export interface CompanyFeatureReadModel {
  /**
   * Комісія за зняття замовлень CANCELLED_BY_Merchant
   * @example true
   */
  cancellationCommission: boolean;
  /**
   * Прапор промоакції
   * @example true
   */
  companyInPromotion: boolean;
  /**
   * Показує, чи увімкнено багатомовність для компанії
   * @example true
   */
  multiLang: boolean;
}

export interface CursorCollection {
  /** Курсор поточної сторінки */
  current?: string;
  /** Курсор наступної сторінки */
  next?: string;
  /** Курсор попередньої сторінки */
  prev?: string;
  /** Курсор останньої сторінки */
  last?: string;
}

export interface CompanyPayments {
  /**
   * @format uuid
   * @example "aa6682d3-ce98-4bea-80bd-20205dc63195"
   */
  company_id?: string;
  /** @example "1111111" */
  service_key?: string;
  /** @example false */
  enabled?: boolean;
  /** @example "2018-02-13T21:02:07.000Z" */
  created_at?: string;
  /** @example "2018-02-13T21:02:07.000Z" */
  updated_at?: string;
}

export interface PaymentSettingModel {
  /**
   * @format uuid
   * @example "8a1643e6-87b6-45fe-8d14-f3c54e221f5a"
   */
  companyId?: string;
  provider?: "easypay" | "monobank";
  isConfigured?: boolean;
  isEnabled?: boolean;
  /** @example "2024-10-23T23:00:00.000Z" */
  createdAt?: string;
  /** @example "2020-05-20T23:00:00.000Z" */
  updatedAt?: string;
}
