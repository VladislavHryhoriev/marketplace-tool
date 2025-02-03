import { API_URLS } from "@/constants";
import { DeliveryResponse } from "./types";

export const getDeliveryDate = async (ttn: string, phone: string) => {
  try {
    if (!ttn || !phone) {
      return { ok: false, ttn, deliveryDate: "", returnDate: "" };
    }

    const response = await fetch(API_URLS.novaPoshta.route, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ttn, phone }),
      next: { revalidate: 10 },
    });

    const json: DeliveryResponse = await response.json();

    return json;
  } catch (error) {
    console.error(error);
    return { ok: false, ttn: "", deliveryDate: "", returnDate: "" };
  }
};
