import { TrackingResult } from "@/clients/nova-poshta/types";
import API_URLS from "@/consts/API_URLS";
import { TemplateNames, TEMPLATES } from "@/consts/TEMPLATES";

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
