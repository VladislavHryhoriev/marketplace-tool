import { setStatus } from "@/lib/rozetka/set-status";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const internalToken = "token123";

  if (token === internalToken) {
    console.log("token === internalToken");

    try {
      console.log(1);
      await setStatus();
      console.log(2);

      return NextResponse.json(
        { ok: 1, message: { token, internalToken } },
        { status: 200 },
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json({ ok: false, message: error }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
