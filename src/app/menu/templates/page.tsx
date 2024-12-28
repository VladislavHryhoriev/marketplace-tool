"use client";
import { List } from "@/components/shared/list";
import { AutoConfirm } from "@/components/shared/templates/autoconfirm";
import { MissedCall } from "@/components/shared/templates/missed-call";
import { Uncollected } from "@/components/shared/templates/uncollected";
import {
  getTemplateEpicentr,
  getTemplateRozetka,
  TemplateNames,
} from "@/get-template";
import { getOrderInfoEpicentr as getOrderInfoEpicentr } from "@/lib/epicentr/get-order-info";
import { getOrderInfoRozetka } from "@/lib/rozetka/get-order-info";
import { useState } from "react";

const Page = () => {
  const [inputID, setInputID] = useState("");
  const [areaText, setAreaText] = useState("");

  const handler = async (templateName: TemplateNames) => {
    if (inputID.startsWith("4")) {
      const { order } = await getOrderInfoEpicentr(inputID);
      const text = await getTemplateEpicentr(templateName, order);
      setAreaText(text);
    }

    if (inputID.startsWith("8")) {
      const { order } = await getOrderInfoRozetka(inputID);
      const text = await getTemplateRozetka(templateName, order);
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
