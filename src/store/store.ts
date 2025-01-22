import { MAX_INPUT_LENGTH } from "@/config";
import { IOrder } from "@/lib/types/rozetka";
import { create } from "zustand";

interface GlobalState {
  orders: IOrder[];
  inputTextOrder: string;
  areaTextOrder: string;
  isFindNewOrders: boolean;

  setInputTextOrder: (text: string) => void;
  setOrders: (orders: IOrder[]) => void;
  setAreaTextOrder: (text: string) => void;
  setIsFindNewOrders: (value: boolean) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  orders: [],
  inputTextOrder: "",
  areaTextOrder: "",

  isFindNewOrders: false,

  setOrders: (orders: IOrder[]) => set({ orders }),
  setInputTextOrder: (text: string) =>
    set((prev) => {
      const numbersOnly = text.replace(/[^0-9]/g, "");
      if (numbersOnly.length < MAX_INPUT_LENGTH) {
        return { inputTextOrder: numbersOnly };
      }
      return prev;
    }),
  setAreaTextOrder: (text: string) => set({ areaTextOrder: text }),
  setIsFindNewOrders: (bool: boolean) => set({ isFindNewOrders: bool }),
}));
