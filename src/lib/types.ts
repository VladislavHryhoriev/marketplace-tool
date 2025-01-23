export interface OrderEpicentr {
  id: string;
  fullname: string;
  products: { title: string; quantity: number; subtotal: number }[];
  deliveryName: string;
  ttn: string;
  get address(): string;
  phone: string;
}

export interface EpicentrOrderResponse {
  settlement: { title: string };
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
