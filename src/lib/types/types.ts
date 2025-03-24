import { IExtendPaymentType } from "@/clients/rozetka/types";

export interface IOrderTemplate {
  id: string | number;
  recipient: { name: string; phone: string };
  user: { name: string; phone: string };
  amount: number | string;
  products: {
    title: string;
    quantity: number;
    cost: number;
    measure?: string;
  }[];
  deliveryName: string;
  ttn: string;
  get address(): string;
  paymentType: IExtendPaymentType["payment_type"];
  paymentTypeName: string;
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
  items: {
    title: string;
    quantity: number;
    subtotal: number;
    measure: string;
  }[];
}

export interface DeliveryInfoResponse {
  data: { ActualDeliveryDate: string; DateReturnCargo: string }[];
}
