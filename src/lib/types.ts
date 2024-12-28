export interface OrderRozetka {
  id: number;
  fullname: string;
  products: { item_name: string; item_price: string }[];
  get address(): string;
  deliveryName: string;
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
