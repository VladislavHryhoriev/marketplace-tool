import { ITokenResponse } from "@/clients/rozetka/types";
import { config } from "@/config";
import API_URLS from "@/consts/API_URLS";

const isBrowser = typeof window !== "undefined";

const fetchToken = async (): Promise<string> => {
  try {
    const response = await fetch(API_URLS.rozetka.token, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: process.env.ROZETKA_USERNAME,
        password: Buffer.from(process.env.ROZETKA_PASSWORD!).toString("base64"),
      }),
    });

    if (!response.ok) throw new Error(response.statusText);

    const { success, content }: ITokenResponse = await response.json();

    if (!content?.access_token || !success) {
      throw new Error("Ошибка получения токена");
    }

    return content.access_token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getToken = (): {
  token: string | null;
  time: number | null;
} => {
  if (!isBrowser) return { token: null, time: null };

  try {
    const token = localStorage.getItem("token");
    const time = localStorage.getItem("token_time");

    return { token, time: time ? Number(time) : null };
  } catch (error) {
    console.error(error);
    return { token: null, time: null };
  }
};

const saveToken = (token: string) => {
  if (!isBrowser) return "Not browser";

  try {
    localStorage.setItem("token", token);
    localStorage.setItem("token_time", Date.now().toString());
  } catch (error) {
    console.error(error);
  }
};

const isValidToken = (storedTime: number, lifetime: number): boolean => {
  return Date.now() - storedTime < lifetime;
};

export const getTokenRozetka = async (): Promise<string> => {
  const { token, time } = getToken();

  if (token && time && isValidToken(time, config.rozetka.tokenLifetime))
    return token;

  const newToken = await fetchToken();
  saveToken(newToken);

  return newToken;
};
