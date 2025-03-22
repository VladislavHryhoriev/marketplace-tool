"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useGlobalStore from "@/store/globalStore";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Edit, FileText, Save } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { FaViber } from "react-icons/fa";
import { RiTelegram2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import TemplateButtons from "./templates/template-buttons";

const Templates = () => {
  const inputTextOrder = useGlobalStore((state) => state.inputTextOrder);
  const setInputTextOrder = useGlobalStore((state) => state.setInputTextOrder);
  const areaTextOrder = useGlobalStore((state) => state.areaTextOrder);
  const setAreaTextOrder = useGlobalStore((state) => state.setAreaTextOrder);
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const activeOrder = useGlobalStore((state) => state.activeOrder);
  const [text, copy] = useCopyToClipboard();

  const handleKeyDown = useCallback(async (e: KeyboardEvent) => {
    if (
      e.ctrlKey &&
      e.code === "KeyV" &&
      document.activeElement !== areaRef.current
    ) {
      try {
        const text = await navigator.clipboard.readText();
        if (text) setInputTextOrder(text);
      } catch (error) {
        console.error(error);
        toast.error("Ошибка копирования");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex flex-wrap gap-6">
      <Card className="flex-3 border-zinc-700 bg-zinc-800/80">
        <CardHeader className="flex flex-row items-center gap-2">
          <FileText className="size-5 text-zinc-400" />
          <CardTitle className="text-lg text-zinc-100">Шаблоны</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              name="inputTextOrder"
              value={inputTextOrder}
              onChange={(e) => setInputTextOrder(e.target.value)}
              placeholder="Номер заказа"
              autoComplete="off"
              className="bg-zinc-900/50"
            />

            <TemplateButtons />
          </div>
        </CardContent>
      </Card>

      <Card className="flex-6 basis-xl border-zinc-700 bg-zinc-800/80">
        <CardHeader className="flex flex-row items-center gap-2">
          <Edit className="size-5 text-zinc-400" />
          <CardTitle className="text-lg text-zinc-100">Редактор</CardTitle>
          <div className="flex flex-1 items-center justify-between gap-2">
            <button
              className="order-last rounded-md p-2 text-green-400 transition-colors hover:bg-zinc-700/50 hover:text-zinc-100"
              onClick={() => copy(areaTextOrder)}
            >
              <Save className="size-5" />
            </button>
            {activeOrder?.phone && inputTextOrder && (
              <div className="flex items-center gap-2">
                <Link
                  href={`viber://chat?number=${activeOrder?.phone}`}
                  target="_blank"
                  onClick={() => copy(areaTextOrder)}
                  className="rounded-md p-2 text-indigo-400 transition-colors hover:bg-zinc-700/50 hover:text-zinc-100"
                >
                  <FaViber className="size-5" />
                </Link>
                <Link
                  href={`https://t.me/+${activeOrder?.phone}`}
                  target="_blank"
                  onClick={() => copy(areaTextOrder)}
                  className="rounded-md p-2 text-blue-400 transition-colors hover:bg-zinc-700/50 hover:text-zinc-100"
                >
                  <RiTelegram2Fill className="size-5" />
                </Link>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Textarea
              ref={areaRef}
              className="w-full rounded-lg border-zinc-700 bg-zinc-900/50 p-4 text-sm text-zinc-100 transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              name="edit"
              id="edit"
              rows={20}
              value={areaTextOrder}
              onChange={(e) => setAreaTextOrder(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Templates;
