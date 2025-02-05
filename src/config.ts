const min = 60 * 1000;
const hour = 60 * 60 * 1000;

export const ROUTES = [
  { title: "API", path: "/menu/api" },
  { title: "Шаблоны", path: "/menu/templates" },
];

export const config = {
  ROZETKA_FETCH_INTERVAL: 1 * min,
  EPICENTR_FETCH_INTERVAL: 5 * min,
  ROZETKA_TOKEN_LIFETIME: 24 * hour,
  MAX_INPUT_LENGTH: 15,
  BOT_OWNER_ID: 901615640,
} as const;
