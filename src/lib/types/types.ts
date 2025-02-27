export interface IOrderTemplate {
  id: string | number;
  fullname: string;
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
