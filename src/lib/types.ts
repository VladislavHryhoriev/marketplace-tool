export interface Order {
  id: number;
  fullname: string;
  products: { item_name: number; item_price: number }[];
  address: string;
  deliveryName: string;
  ttn: string;
}
