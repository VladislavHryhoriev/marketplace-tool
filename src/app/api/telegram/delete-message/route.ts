import { NextRequest, NextResponse } from "next/server";
import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN!);

interface Message {
  msg: {
    msgId: number;
    chatId: number;
    orderId: number;
  };
}

export async function POST(req: NextRequest) {
  try {
    const { msg }: Message = await req.json();
    await bot.api.deleteMessage(msg.chatId, msg.msgId);

    return NextResponse.json(
      {
        ok: true,
        message: {
          msgId: msg.msgId,
          chatId: msg.chatId,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: error }, { status: 500 });
  }
}
