"use client";
import { List } from "@/components/shared/list";
import { Button } from "@/components/ui/button";
import { getEpicentrInfo } from "@/lib/epicentr/get-order-info";
import { getRozetkaInfo } from "@/lib/rozetka/get-order-info";
import { useState } from "react";
import { FaTelegram, FaViber } from "react-icons/fa";

const Page = () => {
  const [inputID, setInputID] = useState("");
  const [areaText, setAreaText] = useState("");

  const handler = async (type?: string) => {
    // rozetka
    if (inputID.startsWith("8")) {
      getRozetkaInfo({ inputID, setAreaText, type });
    }

    // epicentr
    if (inputID.startsWith("4")) {
      getEpicentrInfo({ inputID, setAreaText, type });
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
          <div>
            <p>Недозвон</p>
            <div className="flex gap-2">
              <input
                type="text"
                className="min-w-20 rounded-md bg-zinc-600 p-2 outline-none"
                placeholder="Rozetka ID"
                value={inputID}
                onChange={clearStringsHandler}
              />
              <Button handler={() => handler("viber")}>
                <FaTelegram />
              </Button>
              <Button handler={() => handler()}>
                <FaViber />
              </Button>
            </div>
            <div>1</div>
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
