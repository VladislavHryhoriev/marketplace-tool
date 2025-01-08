export interface OrderRozetka {
  id: number;
  fullname: string;
  products: { item_name: string; cost: string; quantity: number }[];
  get address(): string;
  deliveryName: string;
  total_quantity: number;
  ttn: string;
}

export interface OrderEpicentr {
  id: string;
  fullname: string;
  products: { title: string; quantity: number; subtotal: number }[];
  get address(): string;
  deliveryName: string;
  ttn: string;
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
    total_quantity: number;
    ttn: string;
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
