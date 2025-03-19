import { config } from "@/config";
import { create } from "zustand";

interface GlobalState {
  inputTextOrder: string;
  areaTextOrder: string;
  isOpenMenu: boolean;

  setInputTextOrder: (text: string) => void;
  setAreaTextOrder: (text: string) => void;
  setIsOpenMenu: (isOpen: boolean) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
  inputTextOrder: "",
  areaTextOrder: "",
  isOpenMenu: false,

  setInputTextOrder: (text: string) =>
    set(() => {
      const numbersOnly = text.replace(/[^0-9]/g, "");
      return { inputTextOrder: numbersOnly.slice(0, config.maxInputLength) };
    }),
  setAreaTextOrder: (text: string) => set({ areaTextOrder: text }),
  setIsOpenMenu: (isOpen: boolean) => set({ isOpenMenu: isOpen }),
}));

export default useGlobalStore;
