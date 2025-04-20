import { IExtendPaymentType } from "@/clients/rozetka/types";
import { config } from "@/config";
import { TemplateNames } from "@/consts/TEMPLATES";
import { IOrderTemplate } from "@/lib/types/types";
import { create } from "zustand";

interface State {
  inputTextOrder: string;
  areaTextOrder: string;
  isOpenMenu: boolean;
  activeOrder: IOrderTemplate | null;
  paymentType: IExtendPaymentType["payment_type"];
  activeTemplate: TemplateNames | null;
}

interface Actions {
  setActiveTemplate: (type: TemplateNames | null) => void;
  setActiveOrder: (order: IOrderTemplate | null) => void;
  setInputTextOrder: (text: string) => void;
  setAreaTextOrder: (text: string) => void;
  setIsOpenMenu: (isOpen: boolean) => void;
  setPaymentType: (type: IExtendPaymentType["payment_type"]) => void;
}

const initialState: State = {
  inputTextOrder: "",
  areaTextOrder: "",
  isOpenMenu: false,
  activeOrder: null,
  paymentType: "cash",
  activeTemplate: null,
};

const useGlobalStore = create<State & Actions>((set, get) => ({
  ...initialState,
  setActiveTemplate: (type: TemplateNames | null) =>
    set({ activeTemplate: type }),

  setActiveOrder: (order: IOrderTemplate | null) => set({ activeOrder: order }),

  setInputTextOrder: (text: string) =>
    set(() => {
      const numbersOnly = text.replace(/[^0-9]/g, "");
      return { inputTextOrder: numbersOnly.slice(0, config.maxInputLength) };
    }),
  setAreaTextOrder: (text: string) => set({ areaTextOrder: text }),
  setIsOpenMenu: (isOpen: boolean) => set({ isOpenMenu: isOpen }),
  setPaymentType: (type) => set({ paymentType: type }),
}));

export default useGlobalStore;
