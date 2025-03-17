import { config } from "@/config";
import { create } from "zustand";

interface GlobalState {
  inputTextOrder: string;
  areaTextOrder: string;

  setInputTextOrder: (text: string) => void;
  setAreaTextOrder: (text: string) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  inputTextOrder: "",
  areaTextOrder: "",

  setInputTextOrder: (text: string) =>
    set(() => {
      const numbersOnly = text.replace(/[^0-9]/g, "");
      return { inputTextOrder: numbersOnly.slice(0, config.maxInputLength) };
    }),
  setAreaTextOrder: (text: string) => set({ areaTextOrder: text }),
}));

export default useGlobalStore;
