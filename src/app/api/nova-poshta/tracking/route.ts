import { getDeliveryInfo } from "@/clients/nova-poshta/lib/get-delivery-info";
import { TrackingResponse, TrackingResult } from "@/clients/nova-poshta/types";
import LINKS from "@/consts/LINKS";
import { NextRequest, NextResponse } from "next/server";

const empty = {
  ttn: "",
  date: "",
  return: "",
  status: "",
  statusCode: "",
};

export async function POST(
  req: NextRequest,
): Promise<NextResponse<TrackingResult>> {
  try {
    const { ttn, phone } = await req.json();

    if (!ttn) {
      return NextResponse.json(
        { ok: false, message: "TTN is required", ...empty },
        { status: 400 },
      );
    }

    if (ttn.startsWith("050")) {
      return NextResponse.json(
        { ok: false, message: "TTN from UkrPoshta", ...empty },
        { status: 400 },
      );
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

    const {
      data: [order],
      success,
      errors,
    }: TrackingResponse = await response.json();

    if (!success) {
      return NextResponse.json(
        { ok: false, message: errors, ...empty },
        { status: 400 },
      );
    }

    const deliveryInfo = getDeliveryInfo(order);

    return NextResponse.json<TrackingResult>({
      ok: true,
      ttn,
      date: deliveryInfo.dateTemplate,
      return: deliveryInfo.returnTemplate,
      message: "",
      status: order.Status,
      statusCode: order.StatusCode,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, message: error, ...empty },
      { status: 500 },
    );
  }
}
