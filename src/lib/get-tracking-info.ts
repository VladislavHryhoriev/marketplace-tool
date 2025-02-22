import { API_URLS } from "@/consts/API_URLS";
import { TrackingResult } from "./types/types";

export const getTrackingInfo = async (
  ttn: string,
  phone: string,
): Promise<TrackingResult> => {
  try {
    if (!ttn || !phone) {
      return { ok: false, ttn, date: "", return: "", message: "" };
    }

    const response = await fetch(API_URLS.novaPoshta.route, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ttn, phone }),
      next: { revalidate: 10 },
    });

    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
    return { ok: false, ttn: "", date: "", return: "", message: error };
  }
};
