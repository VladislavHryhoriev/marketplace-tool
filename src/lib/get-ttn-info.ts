import { DeliveryResponse } from "./types";

export const getTTNInfo = async (ttn: string, phone: string) => {
  try {
    const response = await fetch("/api/nova-poshta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ttn, phone }),
    });

    const json: DeliveryResponse = await response.json();

    return json;
  } catch (error) {
    console.error(error);
    return { ok: false, ttn: "", deliveryDate: "", returnDate: "" };
  }
};
