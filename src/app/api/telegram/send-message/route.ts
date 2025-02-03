import { NextRequest, NextResponse } from "next/server";
import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN!);

interface Message {
  chatId: number;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const { chatId, message }: Message = await req.json();
    const msg = await bot.api.sendMessage(chatId, message, {
      parse_mode: "HTML",
    });

    const msg_id = msg.message_id;
    const chat_id = msg.chat.id;

    return NextResponse.json(
      { ok: true, message: { msg_id, chat_id } },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false, message: error }, { status: 500 });
  }
}
