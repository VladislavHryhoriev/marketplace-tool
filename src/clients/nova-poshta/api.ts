import { TrackingResult } from "@/clients/nova-poshta/types";
import API_URLS from "@/consts/API_URLS";
import { TemplateNames, TEMPLATES } from "@/consts/TEMPLATES";

const empty = {
  date: "",
  return: "",
  status: "",
  statusCode: "",
};

class NovaPoshtaApiClient {
  protected async request<T>(url: string, options?: RequestInit): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(url, {
        headers,
        next: { revalidate: 10 },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      return json;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to make API request: ${error}`);
    }
  }

  async getTrackingInfo(
    ttn: string,
    phone: string,
    activeTemplate: TemplateNames,
  ): Promise<TrackingResult> {
    if (activeTemplate === TEMPLATES.uncollected) {
      if (!ttn) {
        return { ok: false, ttn, message: "Нету ТТН в заказе", ...empty };
      }

      if (!phone) {
        return { ok: false, ttn, message: "Нету номера телефона", ...empty };
      }

      try {
        const result = await this.request<TrackingResult>(
          API_URLS.novaPoshta.tracking,
          { method: "POST", body: JSON.stringify({ ttn, phone }) },
        );

        return result;
      } catch (error) {
        return { ok: false, ttn, ...empty, message: error };
      }
    }

    return { ok: true, ttn, message: "", ...empty };
  }
}

const novaPoshtaApi = new NovaPoshtaApiClient();

export default novaPoshtaApi;
