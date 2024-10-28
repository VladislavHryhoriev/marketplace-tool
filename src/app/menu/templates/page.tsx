"use client";
import { List } from "@/components/shared/list";
import { AutoConfirm } from "@/components/shared/templates/autoconfirm";
import { MissedCall } from "@/components/shared/templates/missed-call";
import { Uncollected } from "@/components/shared/templates/uncollected";
import { getTemplate, TemplateNames } from "@/get-template";
import { getOrderInfo } from "@/lib/rozetka/get-order-info";
import { useState } from "react";

const Page = () => {
  const [inputID, setInputID] = useState("");
  const [areaText, setAreaText] = useState("");

  const handler = async (templateName: TemplateNames) => {
    if (inputID.startsWith("8")) {
      const { order } = await getOrderInfo(inputID);

      const text = await getTemplate(templateName, order);

      setAreaText(text);
    }
  };

  const clearStringsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numbersOnly = e.target.value.replace(/[^0-9]/g, "");
    if (e.target.value.length < 20) setInputID(numbersOnly);
  };

  return (
    <List title="Шаблоны">
      <div className="mt-4 flex justify-between gap-2">
        <div>
          <input
            type="text"
            className="min-w-60 rounded-md bg-zinc-600 p-2 outline-none"
            placeholder="Номер заказа"
            name="inputID"
            value={inputID}
            onChange={clearStringsHandler}
          />

          <div className="mt-4 flex flex-col gap-4">
            <MissedCall handler={() => handler("missed-call")} />
            <AutoConfirm handler={() => handler("auto-confirm")} />
            <Uncollected handler={() => handler("uncollected")} />
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
