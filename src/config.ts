import { OrderStatus } from "./clients/epicentr/types";

export interface IConfig {
  fetchInterval: number;
  maxInputLength: number;
  rozetka: { tokenLifetime: number; searchType: number };
  epicentr: { searchType: `${OrderStatus}` };
  botUserIds: { owner: number; ukrstore: number };
}

const min = 60 * 1000;
const hour = 60 * 60 * 1000;

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
    searchType: 2,
  },
  epicentr: {
    searchType: "confirmed_by_merchant",
  },
  botUserIds: {
    owner: BOT_OWNER_ID,
    ukrstore: BOT_UKRSTORE_ID,
  },
} as const;
