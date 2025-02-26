const min = 60 * 1000;
const hour = 60 * 60 * 1000;

export const ROUTES = [
  { title: "Main", path: "/menu/main" },
  { title: "Шаблоны", path: "/menu/templates" },
];

export const config = {
  ROZETKA_FETCH_INTERVAL: 1 * min,
  // ROZETKA_FETCH_INTERVAL: 1000,
  EPICENTR_FETCH_INTERVAL: 5 * min,
  ROZETKA_TOKEN_LIFETIME: 24 * hour,
  MAX_INPUT_LENGTH: 15,
  BOT_OWNER_IDS: [901615640, 751308202],
} as const;
