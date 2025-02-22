import { config } from "@/config";
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

  setOrders: (newOrders: IOrder[]) =>
    set((state) => {
      const isSame =
        state.orders.length === newOrders.length &&
        state.orders.every((order, index) => order.id === newOrders[index].id);

      return isSame ? state : { orders: newOrders };
    }),

  setInputTextOrder: (text: string) =>
    set((prev) => {
      const numbersOnly = text.replace(/[^0-9]/g, "");
      return { inputTextOrder: numbersOnly.slice(0, config.MAX_INPUT_LENGTH) };
    }),
  setAreaTextOrder: (text: string) => set({ areaTextOrder: text }),
  setIsFindNewOrders: (bool: boolean) => set({ isFindNewOrders: bool }),
}));
