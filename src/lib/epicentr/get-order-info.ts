export interface Order {
  fullname: string;
}

interface GetEpicentrInfoTypes {
  inputID: string;
  setAreaText: React.Dispatch<React.SetStateAction<string>>;
  type?: string;
}

export const getOrderInfo = async (id: string): Promise<{ order: Order }> => {
  try {
    const token = process.env.EPICENTR_TOKEN;

    console.log(token);

    const response = await fetch(`/api/epicentr/v2/oms/orders/40718693`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const order = await response.json();

    console.log(order);

    return { order };
  } catch (error) {
    console.log(error);

    return { order: { fullname: "" } };
  }
};

export const getEpicentrInfo = async ({
  inputID,
  setAreaText,
  type,
}: GetEpicentrInfoTypes) => {
  await getOrderInfo(inputID);

  /*
  const cost = order.deliveryName === "nova-pochta" ? [105, 80] : [60, 45];

  const text = `
Добрий день. Не вдалося зв'язатися по номеру телефона, який Ви залишили в замовленні. 
Будь ласка, зателефонуйте нам для підтвердження замовлення 
(068)554-40-46 (063)969-68-29 (099)566-45-21

*Замовили:* ${order.products.map((product) => `${order.products.length > 1 ? "\n- " : ""}${product.item_name}`)}
*Отримувач:* ${order.fullname}
*Адрес доставки:* ${order.address}
*Вартість доставки:* ~${cost[0]}грн (якщо хочете по передоплаті то буде ~${cost[1]}грн)`.trim();

  setAreaText(type !== "viber" ? text : text.replaceAll("*", ""));
	
	*/
};
