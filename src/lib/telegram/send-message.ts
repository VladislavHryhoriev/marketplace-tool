import { API_URLS } from "@/consts/API_URLS";

export type ResponseMessage = {
  message: {
    msg_id: number;
    chat_id: number;
  };
};

export type Message = { chatIds: number[]; message: string };

export const sendMessage = async ({ message, chatIds }: Message) => {
  const response = await fetch(API_URLS.telegram.sendMessage, {
    method: "POST",
    body: JSON.stringify({ chatIds, message }),
  });

  const json: ResponseMessage = await response.json();

  if (!response.ok) throw new Error(response.statusText);

  return json;
};
