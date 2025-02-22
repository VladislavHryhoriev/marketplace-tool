import { config } from "@/config";
import { create } from "zustand";
import useOrdersStore from "./ordersStore";

interface PollingState {
  isPolling: boolean;
  togglePolling: () => void;
  startPolling: (cb?: () => void) => void;
  stopPolling: () => void;
}

let intervalId = null as NodeJS.Timeout | null;

const usePollingStore = create<PollingState>((set, get) => ({
  isPolling: false,
  togglePolling: () => set((prev) => ({ isPolling: !prev.isPolling })),

  startPolling: (cb) => {
    if (intervalId) return;

    const pollingOrders = async () => {
      const { orders, fetchNewOrders } = useOrdersStore.getState();
      const { success } = await fetchNewOrders();
      if (!success) return get().stopPolling();
    };

    pollingOrders();
    intervalId = setInterval(pollingOrders, config.ROZETKA_FETCH_INTERVAL);
    set({ isPolling: true });
  },

  stopPolling: () => {
    if (intervalId) clearInterval(intervalId);
    set({ isPolling: false });
    intervalId = null;
  },
}));

export default usePollingStore;
