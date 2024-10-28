import { NOVA_POCHTA_API_URL } from "@/constants";

export const getTTNInfo = async (ttn: string) => {
  try {
    const body = {
      apiKey: "",
      modelName: "TrackingDocumentGeneral",
      calledMethod: "getStatusDocuments",
      methodProperties: { Documents: [{ DocumentNumber: ttn }] },
    };

    const response = await fetch(`${NOVA_POCHTA_API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return null;
  }
};
