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

export type TemplateNames = "missed-call" | "auto-confirm" | "uncollected";
