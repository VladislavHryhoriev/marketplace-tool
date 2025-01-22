import { BASE_URL, ROZETKA_TOKEN_LIFETIME } from "@/constants";

export interface ITokenResponse {
  success: boolean;
  content: {
    id: number; // ID менеджера
    access_token: string; // Access токен авторизации
    permissions: string[]; // Список Permissions
    roles: string[]; // Список Roles
    seller: {
      fio: string; // ПІБ менеджера
      email: string; // Email менеджера
      first_phone: {
        id: number; // ID запису номера телефону
        phone_number: string; // Номер телефону
        confirmed: boolean; // Прапор, чи підтверджений номер
      };
      wizard: boolean; // Чи потрібен візард клієнту
    };
    market: {
      id: number; // ID продавця (магазину) в системі Розетка Маркетплейс
      logo: string | null; // Логотип (посилання)
      business_model: "c2c" | "b2c"; // Бізнес-модель
      title: string; // Назва магазину
      title_translit: string; // Назва магазину (трансліт)
      market_url: string; // Посилання на магазин на Розетці
      war_block: boolean; // Ознака примусового блокування магазина
      status: number; // Статус магазину
      status_label: string; // Назва статусу магазину
      status_description: string; // Опис статусу магазину
      status_transfer_reason: {
        label: string; // Назва причини
        description: string; // Опис причини
      } | null; // Может быть null
      fulfillment_available: boolean; // Ознака чи доступний магазину функціонал фулфілмента
    };
    raising: {
      campaigns_type: 0 | 1 | 2; // Тип РК: 0 - не створено, 1 - стандартна, 2 - спрощена
    } | null; // Может быть null
    needInterview: boolean; // Ознака, чи потрібно показувати користувачу інтерв'ю
    lang: string; // Мова користувача за замовчуванням
    poll_link: string; // Посилання на опитування
  };
}

const isBrowser = typeof window !== "undefined";

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

  if (token && time && isValidToken(time, ROZETKA_TOKEN_LIFETIME)) return token;

  const newToken = await fetchToken();
  saveToken(newToken);

  return newToken;
};
