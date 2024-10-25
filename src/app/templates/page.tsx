"use client";
import { List } from "@/components/shared/list";
import { Button } from "@/components/ui/button";
import { getOrderInfo } from "@/lib/get-order-info-rozetka";
import { useState } from "react";
import { FaTelegram, FaViber } from "react-icons/fa";

const Page = () => {
  const [rozetkaIdInput, setRozetkaIdInput] = useState("");
  const [areaText, setAreaText] = useState("");

  const handler = async (type?: string) => {
    const { order } = await getOrderInfo(rozetkaIdInput);
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
  };

  const clearStringsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numbersOnly = e.target.value.replace(/[^0-9]/g, "");
    if (e.target.value.length < 20) setRozetkaIdInput(numbersOnly);
  };

  return (
    <List title="Шаблоны">
      <div className="mt-4 flex justify-between gap-2">
        <div>
          <p>Недозвон</p>
          <div className="flex gap-2">
            <input
              type="text"
              className="min-w-20 rounded-md bg-zinc-600 p-2 outline-none"
              placeholder="Rozetka ID"
              value={rozetkaIdInput}
              onChange={clearStringsHandler}
            />
            <Button handler={() => handler("viber")}>
              <FaTelegram />
            </Button>
            <Button handler={() => handler()}>
              <FaViber />
            </Button>
          </div>
        </div>
        <div>
          <textarea
            className="bg-zinc-600 p-2 text-sm outline-none"
            name="edit"
            id="edit"
            cols={60}
            rows={20}
            value={areaText}
            onChange={(e) => setAreaText(e.target.value)}
          />
        </div>
      </div>
    </List>
  );
};

export default Page;
