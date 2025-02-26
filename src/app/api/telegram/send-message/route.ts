import { NextRequest, NextResponse } from "next/server";
import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN!);

export interface Message {
  chatIds: number[];
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const { chatIds, message }: Message = await req.json();

    const messages = await Promise.all(
      chatIds.map(async (chatId) => {
        return await bot.api.sendMessage(chatId, message, {
          parse_mode: "HTML",
        });
      }),
    );

    console.log(messages);

    // const msg_id = msg.message_id;
    // const chat_id = msg.chat.id;

    return NextResponse.json({ ok: true, message: {} }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false, message: error }, { status: 500 });
  }
}
