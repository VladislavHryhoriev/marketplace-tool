import rozetkaApi from "@/clients/rozetka/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tokenUrl = req.nextUrl.searchParams.get("token");
  const internalToken = "token3301";
  const { orders } = await rozetkaApi.getNewOrders();

  if (tokenUrl === internalToken) {
    try {
      const { updatedOrders } = await rozetkaApi.updateOrderStatus({
        orders,
        status: 26,
      });

      return NextResponse.json(
        { ok: true, message: updatedOrders },
        { status: 200 },
      );
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
