export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : "http://localhost:3000";

export const ROZETKA_USERNAME = process.env.ROZETKA_USERNAME;
export const ROZETKA_PASSWORD = process.env.ROZETKA_PASSWORD!;
export const NOVA_POCHTA_API_URL = process.env.NOVA_POCHTA_API_URL;
