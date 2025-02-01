export const ROZETKA_FETCH_INTERVAL = 1 * 60 * 1000;
export const EPICENTR_FETCH_INTERVAL = 5 * 60 * 1000;
export const ROZETKA_TOKEN_LIFETIME = 24 * 60 * 60 * 1000;
export const MAX_INPUT_LENGTH = 15;
export const BOT_OWNER_ID = 901615640;

export const ROUTES = [
  { title: "API", path: "/menu/api" },
  { title: "Шаблоны", path: "/menu/templates" },
];

export const templateTypes = {
  autoconfirm: "AUTOCONFIRM",
  missedCall: "MISSED_CALL",
  uncollected: "UNCOLLECTED",
  confirmWithoutCall: "CONFIRM_WITHOUT_CALL",
};
