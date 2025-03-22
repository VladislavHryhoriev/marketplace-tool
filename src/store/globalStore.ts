import { config } from "@/config";
import { IOrderTemplate } from "@/lib/types/types";
import { create } from "zustand";

interface GlobalState {
  inputTextOrder: string;
  areaTextOrder: string;
  isOpenMenu: boolean;
  activeOrder: IOrderTemplate | null;
  setActiveOrder: (order: IOrderTemplate | null) => void;

  setInputTextOrder: (text: string) => void;
  setAreaTextOrder: (text: string) => void;
  setIsOpenMenu: (isOpen: boolean) => void;
}

const useGlobalStore = create<GlobalState>((set, get) => ({
  inputTextOrder: "",
  areaTextOrder: "",
  isOpenMenu: false,
  activeOrder: null,

  setActiveOrder: (order: IOrderTemplate | null) => set({ activeOrder: order }),

  setInputTextOrder: (text: string) =>
    set(() => {
      const numbersOnly = text.replace(/[^0-9]/g, "");
      return { inputTextOrder: numbersOnly.slice(0, config.maxInputLength) };
    }),
  setAreaTextOrder: (text: string) => set({ areaTextOrder: text }),
  setIsOpenMenu: (isOpen: boolean) => set({ isOpenMenu: isOpen }),
}));

export default useGlobalStore;
