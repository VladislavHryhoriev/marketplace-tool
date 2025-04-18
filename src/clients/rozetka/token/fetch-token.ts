import BASE_URL from "@/consts/BASE_URL";
import { ITokenResponse } from "../types";

const fetchToken = async (): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/api/rozetka/sites`, {
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

export default fetchToken;
