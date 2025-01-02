import { BASE_URL } from "@/constants";
import { getTokenRozetka } from "./get-token-rozetka";

// export interface Product {
// 	count: number;
// 	items: { id: number; status: number }[];
// 	token: string;
// }

export const getProducts = async () /*: Promise<Product> */ => {
  try {
    const token = await getTokenRozetka();
    const response = await fetch(`${BASE_URL}/api/rozetka/goods/on-sale`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await response.json();

    console.log(json);

    return { content: json, token };
  } catch (error) {
    console.log(error);
  }
};
