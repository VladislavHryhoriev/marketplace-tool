import { setStatus } from "@/lib/rozetka/set-status";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const internalToken = "token3301";

  if (token === internalToken) {
    try {
      const { orders } = await setStatus();

      return NextResponse.json({ ok: true, message: orders }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ ok: false, message: error }, { status: 500 });
    }
  }

  return NextResponse.json(
    { ok: false, message: "Unauthorized" },
    { status: 401 },
  );
}
