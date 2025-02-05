import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { authToken } = await req.json();
    cookies().set("auth-token", authToken, { httpOnly: true });

    console.log(cookies().get("auth-token"));

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false, message: error }, { status: 500 });
  }
}
