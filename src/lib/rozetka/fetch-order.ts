import API_URLS from "@/consts/API_URLS";
import { IOrderResponse, TExpandNames } from "@/clients/rozetka/types";
import { getTokenRozetka } from "./get-token-rozetka";

const fetchOrder = async (id: string, expand: TExpandNames[]) => {
  try {
    const token = await getTokenRozetka();
    const response = await fetch(API_URLS.rozetka.orderInfo(id, expand), {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 30 },
    });

    const {
      success,
      content: orderData,
      errors,
    }: IOrderResponse = await response.json();

    if (!success && errors) {
      throw new Error(`${errors.message} | ${errors.description}`);
    }

    return orderData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchOrder;
