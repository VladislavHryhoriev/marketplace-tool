import { LINKS } from "@/constants";
import { DeliveryInfoResponse, DeliveryResponse } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ttn, phone } = await req.json();

    if (ttn.startsWith("050")) {
      return NextResponse.json({ ok: false, message: "UkrPoshta TTN" });
    }

    const body = {
      modelName: "TrackingDocumentGeneral",
      calledMethod: "getStatusDocuments",
      methodProperties: { Documents: [{ DocumentNumber: ttn, Phone: phone }] },
    };

    const response = await fetch(LINKS.novaPoshta.api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json: DeliveryInfoResponse = await response.json();
    const data = json?.data[0];

    const deliveryTime = data.ActualDeliveryDate.split(" ")[1]?.slice(0, 5);

    const [deliveryYear, deliveryMonth, deliveryDay] =
      data.ActualDeliveryDate.split(" ")[0].split("-");

    const isValidDelivery = deliveryDay && deliveryMonth && deliveryYear;

    const [returnYear, returnMonth, returnDay] =
      data?.DateReturnCargo?.split("-") || [];

    const isValid = returnDay && returnMonth && returnYear;

    const deliveryDate = isValidDelivery
      ? `${deliveryTime} ${deliveryDay}.${deliveryMonth}.${deliveryYear}`
      : "";

    const returnDate = isValid
      ? `${+returnDay - 1}.${returnMonth}.${returnYear}`
      : "";

    return NextResponse.json<DeliveryResponse>({
      ok: true,
      ttn,
      deliveryDate,
      returnDate,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: error });
  }
}
