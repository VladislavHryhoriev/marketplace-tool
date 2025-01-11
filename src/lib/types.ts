export interface OrderRozetka {
  id: number;
  fullname: string;
  products: { item_name: string; cost: string; quantity: number }[];
  deliveryName: string;
  totalQuantity: number;
  ttn: string;
  phone: string;
  get address(): string;
}

export interface OrderEpicentr {
  id: string;
  fullname: string;
  products: { title: string; quantity: number; subtotal: number }[];
  deliveryName: string;
  ttn: string;
  get address(): string;
  phone: string;
}

export interface RozetkaOrderResponse {
  errors: {
    message: string;
    description: string;
    details: { value: string };
  };
  success: boolean;
  content: {
    id: number;
    recipient_title: { full_name: string };
    purchases: { item_name: string; cost: string; quantity: number }[];
    delivery: {
      delivery_service_name: string;
      delivery_method_id: number;
      city: { name_ua: string };
      place_street: string;
      place_house: string;
      place_number: string;
      place_flat: string;
      name_logo: string;
    };
    totalQuantity: number;
    ttn: string;
    recipient_phone: string;
  };
}

export interface EpicentrOrderResponse {
  address: {
    firstName: string;
    lastName: string;
    patronymic: string;
    phone: string;
    shipment: { provider: "nova_poshta" | "ukrposhta"; number: string };
  };
  number: string;
  subtotal: number;
  office: { title: string };
  items: { title: string; quantity: number; subtotal: number }[];
}

export type TemplateNames = "missed-call" | "auto-confirm" | "uncollected";

export interface DeliveryInfoResponse {
  data: { ActualDeliveryDate: string; DateReturnCargo: string }[];
}

export interface DeliveryResponse {
  ok: boolean;
  ttn: string;
  deliveryDate: string;
  returnDate: string;
}
