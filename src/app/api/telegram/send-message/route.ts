import { Bot } from "grammy";
import { NextRequest, NextResponse } from "next/server";

const bot = new Bot(process.env.BOT_TOKEN!);

export interface Message {
  id: number;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const chats: Message[] = await req.json();

    const messages = await Promise.allSettled(
      chats.map(async ({ id, message }) => {
        try {
          return await bot.api.sendMessage(id, message, { parse_mode: "HTML" });
        } catch (error) {
          console.error(error);
        }
      }),
    );

    return NextResponse.json({ ok: true, message: messages }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: error }, { status: 500 });
  }
}
