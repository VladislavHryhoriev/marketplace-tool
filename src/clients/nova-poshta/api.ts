import { TrackingData, TrackingResult } from "@/clients/nova-poshta/types";
import API_URLS from "@/consts/API_URLS";
import { TemplateNames, TEMPLATES } from "@/consts/TEMPLATES";
export const getDeliveryInfo = (data: TrackingData) => ({
  time: data.ActualDeliveryDate.split(" ")[1]?.slice(0, 5),

  date: {
    full: data.ActualDeliveryDate.split(" ")[0],
    day: data.ActualDeliveryDate.split(" ")[0].split("-")[2],
    month: data.ActualDeliveryDate.split(" ")[0].split("-")[1],
    year: data.ActualDeliveryDate.split(" ")[0].split("-")[0],
  },

  return: {
    full: data.DateReturnCargo,
    day: data.DateReturnCargo?.split("-")[2],
    month: data.DateReturnCargo?.split("-")[1],
    year: data.DateReturnCargo?.split("-")[0],
  },

  get dateTemplate() {
    if (!this.date.day || !this.date.month || !this.date.year) return "";
    return `${this.date.day}.${this.date.month}.${this.date.year}`;
  },

  get returnTemplate() {
    if (!this.return.day || !this.return.month || !this.return.year) return "";
    return `${+this.return.day - 1}.${this.return.month}.${this.return.year}`;
  },
});

class NovaPoshtaApiClient {
  protected async request<T>(options?: RequestInit): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const response = await fetch(API_URLS.novaPoshta.route, {
      headers,
      next: { revalidate: 10 },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    return json;
  }

  async getTrackingInfo(
    ttn: string,
    phone: string,
    activeTemplate: TemplateNames,
  ) {
    if (activeTemplate === TEMPLATES.uncollected) {
      try {
        return this.request<TrackingResult>({
          method: "POST",
          body: JSON.stringify({ ttn, phone }),
        });
      } catch (error) {
        console.error(error);
        return { ok: false, ttn, date: "", return: "", message: error };
      }
    }

    return { ok: true, ttn, date: "", return: "", message: "" };
  }
}

const novaPoshtaApi = new NovaPoshtaApiClient();

export default novaPoshtaApi;
