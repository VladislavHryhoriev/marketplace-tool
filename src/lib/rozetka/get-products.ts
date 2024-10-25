import { getTokenRozetka } from "./get-token-rozetka";

// export interface Product {
// 	count: number;
// 	items: { id: number; status: number }[];
// 	token: string;
// }

export const getProducts = async () /*: Promise<Product> */ => {
  try {
    const token = await getTokenRozetka();
    const response = await fetch(`/api/rozetka/items`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await response.json();
    const content = json.content;

    console.log(content);

    return { content, token };
  } catch (error) {
    console.log(error);
  }
};
