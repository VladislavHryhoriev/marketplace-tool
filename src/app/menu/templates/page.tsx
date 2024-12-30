"use client";
import { List } from "@/components/shared/list";
import { AutoConfirm } from "@/components/shared/templates/autoconfirm";
import { MissedCall } from "@/components/shared/templates/missed-call";
import { Uncollected } from "@/components/shared/templates/uncollected";
import {
  getTemplateEpicentr,
  getTemplateRozetka,
  TemplateNames,
} from "@/lib/get-template";
import { getOrderInfoEpicentr as getOrderInfoEpicentr } from "@/lib/epicentr/get-order-info";
import { getOrderInfoRozetka } from "@/lib/rozetka/get-order-info";
import { ClipboardCopy } from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
  toast.success("Шаблон скопирован в буфер обмена");
};

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

  const filterNumInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            onChange={filterNumInput}
          />

          <div className="mt-4 flex flex-col gap-4">
            <MissedCall handler={() => handler("missed-call")} />
            <AutoConfirm handler={() => handler("auto-confirm")} />
            <Uncollected handler={() => handler("uncollected")} />
          </div>
        </div>

        <div className="relative">
          <textarea
            className="bg-zinc-600 p-2 text-sm outline-none"
            name="edit"
            id="edit"
            cols={60}
            rows={20}
            value={areaText}
            onChange={(e) => setAreaText(e.target.value)}
          />
          <button
            className="absolute right-0 m-2 rounded-md bg-zinc-600 p-1 hover:text-green-500 active:translate-y-0.5"
            onClick={() => copyToClipboard(areaText)}
          >
            <ClipboardCopy />
          </button>
        </div>
      </div>
      <ToastContainer
        hideProgressBar
        theme="dark"
        position="bottom-right"
        closeOnClick
      />
    </List>
  );
};

export default Page;
