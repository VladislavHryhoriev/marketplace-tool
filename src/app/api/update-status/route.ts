import { getNewOrders } from "@/lib/rozetka/get-new-orders";
import { updateOrderStatus } from "@/lib/rozetka/update-order-status";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tokenUrl = req.nextUrl.searchParams.get("token");
  const internalToken = "token3301";
  const { orders, token } = await getNewOrders();

  if (tokenUrl === internalToken) {
    try {
      const { updatedOrders } = await updateOrderStatus({ orders, token });

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
