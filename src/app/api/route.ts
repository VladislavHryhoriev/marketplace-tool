import BASE_URL from "@/consts/BASE_URL";
import { getTokenRozetka } from "@/lib/rozetka/get-token-rozetka";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const token = await getTokenRozetka();
    // const res = await fetch(`${BASE_URL}/api/rozetka/order-statuses/search`, {
    //   headers: { Authorization: `Bearer ${token}` },
    // });

    // if (!res.ok) throw new Error(res.statusText);

    // const json = await res.json();

    // console.log(json);

    // return NextResponse.json({ ok: true, message: json }, { status: 200 });
    return NextResponse.json({ ok: true, message: "OK" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false, message: error }, { status: 500 });
  }
}
