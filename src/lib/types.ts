import { TEMPLATE_TYPES } from "@/constants";

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

export type TemplateNames =
  (typeof TEMPLATE_TYPES)[keyof typeof TEMPLATE_TYPES];

export interface DeliveryInfoResponse {
  data: { ActualDeliveryDate: string; DateReturnCargo: string }[];
}

export interface DeliveryResponse {
  ok: boolean;
  ttn: string;
  deliveryDate: string;
  returnDate: string;
}
