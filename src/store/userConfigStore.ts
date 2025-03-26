import { TEpicentrSearchType } from "@/clients/epicentr/types";
import { TRozetkaSearchType } from "@/clients/rozetka/types";
import { config, setSearchType } from "@/config";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserConfigState {
  notifications: {
    browser: boolean;
    telegram: boolean;
    sendToProcess: boolean;
  };

  market: {
    rozetkaSearchType: TRozetkaSearchType;
    epicenterSearchType: TEpicentrSearchType;
  };

  setNotifications: (
    newNotificationsConfig: Partial<UserConfigState["notifications"]>,
  ) => void;

  setMarket: (newMarketConfig: Partial<UserConfigState["market"]>) => void;

  resetMarket: () => void;
}

const useUserConfigStore = create(
  persist<UserConfigState>(
    (set) => ({
      notifications: {
        browser: false,
        telegram: false,
        sendToProcess: false,
      },

      market: {
        rozetkaSearchType: config.rozetka.searchType,
        epicenterSearchType: config.epicentr.searchType,
      },

      setMarket: (newMarketConfig) => {
        setSearchType({
          rozetka: newMarketConfig.rozetkaSearchType as TRozetkaSearchType,
          epicentr: newMarketConfig.epicenterSearchType as TEpicentrSearchType,
        });

        set((state) => ({
          market: { ...state.market, ...newMarketConfig },
        }));
      },

      resetMarket: () => {
        setSearchType({ rozetka: 4, epicentr: "new" });
        set({ market: { rozetkaSearchType: 4, epicenterSearchType: "new" } });
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
