import { getNewOrders } from "@/lib/rozetka/get-new-orders";
import { IOrder } from "@/lib/types/rozetka";
import { create } from "zustand";

interface OrdersState {
  orders: IOrder[];
  setOrders: (orders: IOrder[]) => void;
  fetchNewOrders: () => Promise<{ orders: IOrder[]; success: boolean }>;
}

const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  setOrders: (orders: IOrder[]) => set({ orders }),

  fetchNewOrders: async () => {
    const { orders, success } = await getNewOrders();
    if (!success) return { orders: [], success };

    set({ orders });
    return { orders, success };
  },
}));

export default useOrdersStore;
