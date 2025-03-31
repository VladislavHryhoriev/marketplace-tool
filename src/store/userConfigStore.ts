import { TEpicentrSearchType } from "@/clients/epicentr/types";
import { TRozetkaSearchType } from "@/clients/rozetka/types";
import { config, defaultConfig, setConfig, setSearchType } from "@/config";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import usePollingStore from "./pollingStore";
import { get } from "node:http";

interface State {
  notifications: {
    browser: boolean;
    telegram: boolean;
    sendToProcess: boolean;
  };
  market: {
    rozetkaSearchType: TRozetkaSearchType;
    epicenterSearchType: TEpicentrSearchType;
  };
}

interface Actions {
  setNotifications: (
    newNotificationsConfig: Partial<State["notifications"]>,
  ) => void;
  setMarket: (newMarketConfig: Partial<State["market"]>) => void;
  resetMarket: () => void;
}

const initialState: State = {
  notifications: {
    browser: false,
    telegram: false,
    sendToProcess: false,
  },

  market: {
    rozetkaSearchType: config.rozetka.searchType,
    epicenterSearchType: config.epicentr.searchType,
  },
};
const useUserConfigStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setMarket: (newMarketConfig) => {
        setSearchType({
          rozetka:
            newMarketConfig.rozetkaSearchType ?? get().market.rozetkaSearchType,
          epicentr:
            newMarketConfig.epicenterSearchType ??
            get().market.epicenterSearchType,
        });

        set((state) => ({ market: { ...state.market, ...newMarketConfig } }));
        usePollingStore.getState().resetOrders();
      },

      resetMarket: () => {
        setConfig(defaultConfig);
        set({
          market: {
            rozetkaSearchType: defaultConfig.rozetka.searchType,
            epicenterSearchType: defaultConfig.epicentr.searchType,
          },
        });
        usePollingStore.getState().resetOrders();
      },

      setNotifications: (newNotificationsConfig) =>
        set((state) => ({
          notifications: { ...state.notifications, ...newNotificationsConfig },
        })),
    }),
    { name: "config" },
  ),
);

export default useUserConfigStore;
