import API_URLS from "@/consts/API_URLS";

const headers = {
  Authorization: `Bearer ${process.env.EPICENTR_TOKEN}`,
  "accept-language": "uk",
};

const fetchOrder = async (orderNum: string) => {
  try {
    const v3Response = await fetch(API_URLS.epicentr.order(orderNum), {
      headers,
      next: { revalidate: 10 },
    });
    const id = await v3Response.json().then((res) => res.items[0].id);

    if (!v3Response) throw new Error("Order not found");

    const response = await fetch(API_URLS.epicentr.orderInfo(id), { headers });
    const orderInfo = await response.json();

    return orderInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchOrder;
