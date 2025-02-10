"use client";
import { List } from "@/components/shared/list";
import TemplateButtons from "@/components/shared/templates/template-buttons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { useGlobalStore } from "@/store/store";
import { ClipboardCopy } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const Templates = () => {
  const inputTextOrder = useGlobalStore((state) => state.inputTextOrder);
  const setInputTextOrder = useGlobalStore((state) => state.setInputTextOrder);
  const areaTextOrder = useGlobalStore((state) => state.areaTextOrder);
  const setAreaTextOrder = useGlobalStore((state) => state.setAreaTextOrder);
  const areaRef = useRef<HTMLTextAreaElement>(null);

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
    <List>
      <div className="flex justify-between gap-4">
        <div>
          <Input
            type="text"
            name="inputTextOrder"
            value={inputTextOrder}
            onChange={(e) => setInputTextOrder(e.target.value)}
            placeholder="Номер заказа"
            autoComplete="off"
          />

          <TemplateButtons />
        </div>

        <div className="relative">
          <Textarea
            ref={areaRef}
            className="p-2 text-sm outline outline-2 outline-indigo-500"
            name="edit"
            id="edit"
            cols={70}
            rows={20}
            value={areaTextOrder}
            onChange={(e) => setAreaTextOrder(e.target.value)}
          />
          <button
            className="absolute right-0 top-0 m-2 rounded-md bg-background p-1 hover:text-green-500 active:translate-y-0.5"
            onClick={() => copyToClipboard(areaTextOrder)}
          >
            <ClipboardCopy />
          </button>
        </div>
      </div>
    </List>
  );
};

export default Templates;
