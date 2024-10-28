import { NextRequest, NextResponse } from "next/server";

export interface ApiResponse {
  data: { ScheduledDeliveryDate: string }[];
}

export async function POST(req: NextRequest) {
  // try {
  //   const { ttn } = await req.json();
  //   if (ttn.startsWith("050")) {
  //     return NextResponse.json({ ok: false, message: "UkrPoshta TTN" });
  //   }
  //   const body = {
  //     modelName: "TrackingDocumentGeneral",
  //     calledMethod: "getStatusDocuments",
  //     methodProperties: { Documents: [{ DocumentNumber: ttn }] },
  //   };
  //   const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(body),
  //   });
  //   const json: ApiResponse = await response.json();
  //   return NextResponse.json({ ttn, date: json.data[0].ScheduledDeliveryDate });
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.json({ ok: false, message: error });
  // }
}
