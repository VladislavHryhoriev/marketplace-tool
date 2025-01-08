"use client";
import { List } from "@/components/shared/list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { getOrderInfoEpicentr } from "@/lib/epicentr/get-order-info";
import { getOrderInfoRozetka } from "@/lib/rozetka/get-order-info";
import { getTemplateEpicentr } from "@/lib/templates/get-template-epicentr";
import { getTemplateRozetka } from "@/lib/templates/get-template-rozetka";
import { TemplateNames } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  CircleCheckBig,
  ClipboardCopy,
  ClockArrowDown,
  PhoneMissed,
} from "lucide-react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const copyToClipboard = async (text: string) => {
  if (!text) {
    toast.error("Нет текста для копирования");
    return;
  }

  await navigator.clipboard.writeText(text);
  toast.success("Шаблон скопирован в буфер обмена");
};

const checkMarket = (inputID: string, strArr: string[]) => {
  for (const el of strArr) if (inputID.startsWith(el)) return true;
};

const Page = () => {
  const [inputID, setInputID] = useState("");
  const [areaText, setAreaText] = useState("");
  const [selectedOpt, setSelectedOpt] = useState("");

  const handler = async (templateName: TemplateNames) => {
    setAreaText("");

    if (!inputID) toast.warn("Введите номер заказа");

    // Rozetka
    if (checkMarket(inputID, ["83", "84"])) {
      setSelectedOpt("Rozetka");

      const { order, ok } = await getOrderInfoRozetka(inputID);
      if (!ok) {
        setAreaText("Заказ не найден");
        return;
      }

      const text = await getTemplateRozetka(templateName, order);
      setAreaText(text);
    }

    // Epicentr
    if (checkMarket(inputID, ["43", "44"])) {
      setSelectedOpt("Epicentr");

      const { order, ok } = await getOrderInfoEpicentr(inputID);
      if (!ok) {
        setAreaText("Заказ не найден");
        return;
      }

      const text = await getTemplateEpicentr(templateName, order);
      setAreaText(text);
    }
  };

  const filterNumInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numbersOnly = e.target.value.replace(/[^0-9]/g, "");
    if (e.target.value.length < 20) setInputID(numbersOnly);

    setSelectedOpt("");
    checkMarket(numbersOnly, ["83", "84"]) && setSelectedOpt("Rozetka");
    checkMarket(numbersOnly, ["43", "44"]) && setSelectedOpt("Epicentr");
  };

  return (
    <List>
      <div className="flex justify-between gap-4">
        <div>
          <Input
            type="text"
            name="inputID"
            value={inputID}
            onChange={filterNumInput}
            placeholder="Номер заказа"
            autoComplete="off"
          />

          <div className="mt-4">
            <RadioGroup
              value={selectedOpt}
              onValueChange={setSelectedOpt}
              className="grid grid-cols-2 gap-0 overflow-hidden rounded-md bg-zinc-700 text-center"
            >
              {["Rozetka", "Epicentr"].map((opt) => (
                <div key={opt}>
                  <RadioGroupItem
                    value={opt}
                    id={opt}
                    checked={selectedOpt === opt}
                    className="hidden"
                    disabled
                  />
                  <Label
                    htmlFor={opt}
                    className={cn("block p-2 transition-colors", {
                      "bg-indigo-500": selectedOpt === opt,
                    })}
                  >
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <Button onClick={() => handler("missed-call")}>
              <PhoneMissed />
              Недозвон
            </Button>
            <Button onClick={() => handler("auto-confirm")}>
              <CircleCheckBig />
              Автоподтверждение
            </Button>
            <Button onClick={() => handler("uncollected")}>
              <ClockArrowDown />
              Не забирает заказ
            </Button>
          </div>
        </div>

        <div className="relative">
          <Textarea
            className="p-2 text-sm outline outline-2 outline-indigo-500"
            name="edit"
            id="edit"
            cols={70}
            rows={20}
            value={areaText}
            onChange={(e) => setAreaText(e.target.value)}
          />
          <button
            className="absolute right-0 top-0 m-2 rounded-md bg-background p-1 hover:text-green-500 active:translate-y-0.5"
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
        pauseOnFocusLoss={false}
      />
    </List>
  );
};

export default Page;
