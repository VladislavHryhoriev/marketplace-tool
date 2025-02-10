import { config } from "@/config";
import { IOrder } from "@/lib/types/rozetka";
import { create } from "zustand";

interface GlobalState {
  orders: IOrder[];
  inputTextOrder: string;
  areaTextOrder: string;
  isFindNewOrders: boolean;
  notifiedOrdersIds: number[];

  setInputTextOrder: (text: string) => void;
  setOrders: (orders: IOrder[]) => void;
  setAreaTextOrder: (text: string) => void;
  setIsFindNewOrders: (value: boolean) => void;
  addNotifiedOrderId: (id: number) => void;
  setNotifiedOrdersIds: (ids: number[]) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  orders: [],
  inputTextOrder: "",
  areaTextOrder: "",
  notifiedOrdersIds: [],
  isFindNewOrders: false,

  setOrders: (orders: IOrder[]) => set({ orders }),
  setInputTextOrder: (text: string) =>
    set((prev) => {
      const numbersOnly = text.replace(/[^0-9]/g, "");
      return { inputTextOrder: numbersOnly.slice(0, config.MAX_INPUT_LENGTH) };
    }),
  setAreaTextOrder: (text: string) => set({ areaTextOrder: text }),
  setIsFindNewOrders: (bool: boolean) => set({ isFindNewOrders: bool }),

  addNotifiedOrderId: (id: number) =>
    set((prev) => ({
      notifiedOrdersIds: prev.notifiedOrdersIds.includes(id)
        ? prev.notifiedOrdersIds
        : [...prev.notifiedOrdersIds, id],
    })),

  setNotifiedOrdersIds: (ids: number[]) =>
    set({ notifiedOrdersIds: Array.from(new Set(ids)) }),
}));
