import { OrderStatus } from "./clients/epicentr/types";

export interface IConfig {
  fetchInterval: number;
  maxInputLength: number;
  rozetka: { tokenLifetime: number; searchType: number };
  epicentr: { searchType: `${OrderStatus}` };
  botUserIds: { owner: number; ukrstore: number };
  deliveryCost: {
    nova: { price: number; commision: number };
    ukr: { price: number; commision: number };
  };
  interval: number;
}

const sec = 1000;
const min = 60 * sec;
const hour = 60 * min;

export const ROUTES = [
  { title: "Главная", path: "/menu/main" },
  { title: "Шаблоны", path: "/menu/templates" },
  { title: "Настройки", path: "/menu/settings" },
];

export const BOT_OWNER_ID = 751308202;
export const BOT_UKRSTORE_ID = 901615640;

export const config: IConfig = {
  fetchInterval: 1 * min,
  maxInputLength: 15,
  rozetka: {
    tokenLifetime: 24 * hour,
    searchType: 4,
  },
  epicentr: {
    searchType: "new",
  },
  botUserIds: {
    owner: BOT_OWNER_ID,
    ukrstore: BOT_UKRSTORE_ID,
  },
  deliveryCost: {
    nova: { price: 80, commision: 20 },
    ukr: { price: 55, commision: 10 },
  },
  interval: sec,
} as const;
