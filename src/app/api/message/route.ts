import { NextRequest, NextResponse } from "next/server";
import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN!);

interface Message {
  chatId: number;
  message: string;
}

export async function POST(req: NextRequest) {
  const { chatId, message }: Message = await req.json();

  await bot.api.sendMessage(chatId, message);
  return NextResponse.json({ ok: true, message: "ok" });
}
