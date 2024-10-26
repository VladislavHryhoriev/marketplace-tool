import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const token = req.nextUrl.searchParams.get("token");
  const internalToken = "token123";

  if (token === internalToken) {
    try {
      return NextResponse.json(
        { ok: 1, message: { token, internalToken } },
        { status: 200 },
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
