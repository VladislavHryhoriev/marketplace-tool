import { getDeliveryInfo } from "@/clients/nova-poshta/api";
import { TrackingResponse, TrackingResult } from "@/clients/nova-poshta/types";
import LINKS from "@/consts/LINKS";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<TrackingResult>> {
  try {
    const { ttn, phone } = await req.json();

    if (!ttn)
      return NextResponse.json({
        ok: true,
        message: "TTN is required",
        ttn: "",
        date: "",
        return: "",
      });

    if (ttn.startsWith("050")) {
      return NextResponse.json({
        ok: true,
        message: "UkrPoshta TTN",
        ttn: "",
        date: "",
        return: "",
      });
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

    const { data, success, errors }: TrackingResponse = await response.json();

    if (!success)
      return NextResponse.json(
        {
          ok: false,
          message: errors,
          ttn: "",
          date: "",
          return: "",
        },
        { status: 400 },
      );

    const deliveryInfo = getDeliveryInfo(data[0]);

    return NextResponse.json<TrackingResult>({
      ok: true,
      ttn,
      date: deliveryInfo.dateTemplate,
      return: deliveryInfo.returnTemplate,
      message: "",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        message: error,
        ttn: "",
        date: "",
        return: "",
      },
      { status: 500 },
    );
  }
}
