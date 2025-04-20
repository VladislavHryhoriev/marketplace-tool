import { Box, LayoutTemplate, Settings } from "lucide-react";
import { TEpicentrSearchType } from "./clients/epicentr/types";
import { TRozetkaSearchType } from "./clients/rozetka/types";
import { hour, min, sec } from "./consts/TIME";
import { IConfig } from "./types/config";

export const ROUTES = [
  {
    title: "Главная",
    path: "/menu/main",
    icon: <Box className="size-5" />,
  },
  {
    title: "Шаблоны",
    path: "/menu/templates",
    icon: <LayoutTemplate className="size-5" />,
  },
  {
    title: "Настройки",
    path: "/menu/settings",
    icon: <Settings className="size-5" />,
  },
] as const;

export const BOT_OWNER_ID = 751308202;
export const BOT_UKRSTORE_ID = 901615640;

export const defaultConfig: IConfig = {
  fetchInterval: 1 * min,
  maxInputLength: 15,
  rozetka: { searchType: 4, tokenLifetime: 24 * hour },
  epicentr: { searchType: "new" },
  botUserIds: { owner: BOT_OWNER_ID, ukrstore: BOT_UKRSTORE_ID },
  deliveryCost: {
    nova: { price: 80, commision: 20 },
    ukr: { price: 55, commision: 10 },
  },
  interval: sec,
};

Object.freeze(defaultConfig);

export let config: IConfig = JSON.parse(JSON.stringify(defaultConfig));

export const setConfig = (newConfig: Partial<IConfig>) => {
  config = { ...config, ...newConfig };
};

export const setSearchType = (newConfig: {
  rozetka: TRozetkaSearchType;
  epicentr: TEpicentrSearchType;
}) => {
  setConfig({
    rozetka: { ...config.rozetka, searchType: newConfig.rozetka },
    epicentr: { ...config.epicentr, searchType: newConfig.epicentr },
  });
};
