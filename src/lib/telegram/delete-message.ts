import { API_URLS } from "@/consts/API_URLS";

export type ResponseMessage = {
  message: {
    msg_id: number;
    chat_id: number;
  };
};

export type Message = {
  msg: {
    msg_id: number;
    chat_id: number;
    orderId: number;
  };
};

export const deleteMessage = async ({ msg }: Message) => {
  const response = await fetch(API_URLS.telegram.deleteMessage, {
    method: "POST",
    body: JSON.stringify({ msg }),
  });

  const json: ResponseMessage = await response.json();

  if (!response.ok) throw new Error(response.statusText);

  return json;
};
