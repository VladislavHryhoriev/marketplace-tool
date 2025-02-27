export interface TrackingData {
  PossibilityCreateReturn: boolean; // Доступність замовлення послуги повернення вантажу (true/false)
  PossibilityCreateRefusal: boolean; // Доступність замовлення послуги відмови від вантажу (true/false)
  PossibilityChangeEW: boolean; // Доступність замовлення послуги внесення змін в ЕН (true/false)
  PossibilityCreateRedirecting: boolean; // Доступність замовлення послуги переадресування (true/false)
  Number: string; // Номер документу
  Redelivery: string; // Ідентифікатор зворотної доставки (0 - відсутня, 1 - наявна)
  RedeliverySum: string; // Сума зворотної доставки
  RedeliveryNum: string; // Ідентифікатор номеру ЕН зворотної доставки (якщо є)
  RedeliveryPayer: string; // Ідентифікатор платника зворотної доставки
  OwnerDocumentType: string; // Тип ЕН на підставі
  LastCreatedOnTheBasisDocumentType: string; // Останні зміни типу документу
  LastCreatedOnTheBasisPayerType: string; // Останні зміни, тип платника
  LastCreatedOnTheBasisDateTime: string; // Останні зміни, дата створення
  LastTransactionStatusGM: string; // Останній статус транзакції грошового переказу
  LastTransactionDateTimeGM: string; // Останній час та дата транзакції грошового переказу
  LastAmountTransferGM: string; // Поточне значення суми грошового переказу
  DateCreated: string; // Дата створення ЕН
  DocumentWeight: string; // Вага
  FactualWeight: string; // Фактична вага з ЕН
  VolumeWeight: string; // Об'ємна вага з ЕН
  CheckWeight: string; // Інформація після контрольного зважування
  CheckWeightMethod: string; // Тип зважування, згідно якого виконувалось контрольне зважування
  DocumentCost: string; // Вартість доставки
  CalculatedWeight: string; // Розрахункова вага
  SumBeforeCheckWeight: string; // Інформація до контрольного зважування
  PayerType: string; // Ідентифікатор платника
  RecipientFullName: string; // ПІБ отримувача з накладної
  RecipientDateTime: string; // Дата, коли отримувач забрав вантаж
  ScheduledDeliveryDate: string; // Очікувана дата доставки
  PaymentMethod: string; // Тип оплати
  CargoDescriptionString: string; // Опис вантажу
  CargoType: string; // Тип вантажу
  CitySender: string; // Місто відправника
  CityRecipient: string; // Місто отримувача
  WarehouseRecipient: string; // Склад отримувача
  CounterpartyType: string; // Тип контрагента
  AfterpaymentOnGoodsCost: string; // Контроль оплати
  ServiceType: string; // Тип доставки
  UndeliveryReasonsSubtypeDescription: string; // Опис причини нерозвезення
  WarehouseRecipientNumber: string; // Номер відділення отримувача
  LastCreatedOnTheBasisNumber: string; // Останні зміни, номер ЕН
  PhoneRecipient: string; // Номер телефону отримувача
  RecipientFullNameEW: string; // ПІБ отримувача з накладної, якщо зазначено номер телефону
  WarehouseRecipientInternetAddressRef: string; // Ідентифікатор складу отримувача
  MarketplacePartnerToken: string; // Токен торгівельного майданчику
  ClientBarcode: string; // Внутрішній номер замовлення
  RecipientAddress: string; // Адреса отримувача
  CounterpartyRecipientDescription: string; // Опис контрагента отримувача
  CounterpartySenderType: string; // Тип контрагента відправника
  DateScan: string; // Дата сканування, що призвела до формування статусу
  PaymentStatus: string; // Статус для інтернет еквайрингу
  PaymentStatusDate: string; // Дата оплати для інтернет еквайрингу
  AmountToPay: string; // Сума до сплати для інтернет еквайрингу
  AmountPaid: string; // Сплачено для інтернет еквайрингу
  Status: string; // Статус
  StatusCode: string; // Ідентифікатор статусу
  RefEW: string; // Ідентифікатор накладної для інтернет еквайрингу
  BackwardDeliverySubTypesActions: string; // Інформація за нестандартними підтипами зворотної доставки
  BackwardDeliverySubTypesServices: string; // Інформація за нестандартними підтипами зворотної доставки
  UndeliveryReasons: string; // Причина нерозвозу
  DatePayedKeeping: string; // Дата початку платного зберігання
  InternationalDeliveryType: string; // Тип міжнародної доставки
  SeatsAmount: string; // Кількість місць
  CardMaskedNumber: string; // Замаскований номер платіжної карти
  ExpressWaybillPaymentStatus: string; // Статус оплати ЕН
  ExpressWaybillAmountToPay: string; // Сума оплати по ЕН
  PhoneSender: string; // Телефон відправника
  TrackingUpdateDate: string; // Оновлена дата відстеження
  WarehouseSender: string; // Відділення відправника
  DateReturnCargo: string; // Дата повернення вантажу
  DateMoving: string; // Дата переміщення
  DateFirstDayStorage: string; // Дата початку зберігання
  RefCityRecipient: string; // Ідентифікатор міста одержувача
  RefCitySender: string; // Ідентифікатор міста відправника
  RefSettlementRecipient: string; // Ідентифікатор населеного пункту одержувача
  RefSettlementSender: string; // Ідентифікатор населеного пункту відправника
  SenderAddress: string; // Адреса відправника
  SenderFullNameEW: string; // Повне ім'я відправника
  AnnouncedPrice: string; // Оголошена вартість
  AdditionalInformationEW: string; // Додаткова інформація
  ActualDeliveryDate: string; // Фактична дата доставки
  PostomatV3CellReservationNumber: string; // Номер бронювання комірки поштомату
  OwnerDocumentNumber: string; // Номер ЕН на основі
  LastAmountReceivedCommissionGM: string; // Сума комісії за грошовий переказ
  DeliveryTimeframe: string; // Часовий інтервал доставки
  CreatedOnTheBasis: string; // Створено на основі
  UndeliveryReasonsDate: string; // Дата причини нерозвезення
  RecipientWarehouseTypeRef: string; // Ідентифікатор типу відділення одержувача
  WarehouseRecipientRef: string; // Ідентифікатор відділення одержувача
  CategoryOfWarehouse: string; // Категорія відділення
  WarehouseRecipientAddress: string; // Адреса відділення одержувача
  WarehouseSenderInternetAddressRef: string; // Інтернет адреса відділення відправника
  WarehouseSenderAddress: string; // Адреса відділення відправника
  AviaDelivery: string; // Авіа доставка
  BarcodeRedBox: string; // ШК пакування типу RedBox
  CargoReturnRefusal: string; // Наявність послуги "Відмова від повернення" (true - замовлено, false - не замовлено)
  DaysStorageCargo: string; // День зберігання вантажу
  Packaging: string[]; // Пакування
  PartialReturnGoods: string[]; // Часткове повернення
  SecurePayment: boolean; // Ознака надійної покупки (true - замовлено, false - не замовлено)
  PossibilityChangeCash2Card: boolean; // Доступність зміни виплати грошового переказу на карту (true/false)
  PossibilityChangeDeliveryIntervals: boolean; // Доступність зміни інтервалу доставки (true/false)
  PossibilityTermExtensio: boolean; // Доступність подовження термінів зберігання (true/false)
  StorageAmount: string; // Кількість днів зберігання вантажу
  StoragePrice: string; // Вартість зберігання
  FreeShipping: boolean; // Ознака безкоштовної доставки (true/false)
  LoyaltyCardRecipient: string; // Номер карти лояльності отримувача
}

export interface TrackingResponse {
  success: boolean;
  data: TrackingData[];
  errors: [];
  warnings: [];
  info: [];
  messageCodes: [];
  errorCodes: [];
  warningCodes: [];
  infoCodes: [];
}
export interface TrackingResult {
  ok: boolean;
  ttn: string;
  date: string;
  return: string;
  message: string | unknown;
}
