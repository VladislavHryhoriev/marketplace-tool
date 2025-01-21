export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : "http://localhost:3000";

export const ROZETKA_FETCH_INTERVAL = 1 * 60 * 1000;
export const EPICENTR_FETCH_INTERVAL = 5 * 60 * 1000;
export const ROZETKA_TOKEN_LIFETIME = 24 * 60 * 60 * 1000;

export const MAX_INPUT_LENGTH = 15;
