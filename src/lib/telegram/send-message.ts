import { Message } from "@/app/api/telegram/send-message/route";
import API_URLS from "@/consts/API_URLS";

export type ResponseMessage = {
  message: {
    msg_id: number;
    chat_id: number;
  };
};

export const sendMessage = async (chats: Message[]) => {
  try {
    const response = await fetch(API_URLS.telegram.sendMessage, {
      method: "POST",
      body: JSON.stringify(chats),
    });

    const json: ResponseMessage = await response.json();

    if (!response.ok) throw new Error(response.statusText);

    return json;
  } catch (error) {
    console.error(error);
    return null;
  }
};
