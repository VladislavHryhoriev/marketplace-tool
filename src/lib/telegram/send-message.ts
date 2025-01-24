import { BASE_URL } from "@/constants";

export const sendMessage = async (chatId: number, message: string) => {
  const response = await fetch(`${BASE_URL}/api/message`, {
    method: "POST",
    body: JSON.stringify({ chatId, message }),
  });

  return await response.json();
};
