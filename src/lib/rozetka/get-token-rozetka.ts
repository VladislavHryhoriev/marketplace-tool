import { BASE_URL } from "@/constants";

interface Response {
  content: { access_token: string };
}

export const getTokenRozetka = async () => {
  const isBrowser = typeof window !== "undefined";

  if (isBrowser) {
    const token_time = Number(localStorage.getItem("token_time"));
    const token = localStorage.getItem("token");

    if (Date.now() - token_time < 1000 * 60 * 60 * 24 && token) return token;
  }

  const response = await fetch(`/api/rozetka/sites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: process.env.ROZETKA_USERNAME,
      password: Buffer.from(process.env.ROZETKA_PASSWORD!).toString("base64"),
    }),
  });

  const json: Response = await response.json();

  if (isBrowser) {
    localStorage.setItem("token", json.content.access_token);
    localStorage.setItem("token_time", Date.now().toString());
  }

  return json.content.access_token;
};
