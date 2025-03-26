import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ ok: true, message: "OK" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false, message: error }, { status: 500 });
  }
}
