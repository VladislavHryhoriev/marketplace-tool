import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserConfigState {
  notifications: {
    browser: boolean;
    telegram: boolean;
    sendToProcess: boolean;
  };

  setNotifications: (
    newConfig: Partial<UserConfigState["notifications"]>,
  ) => void;
}

const useUserConfigStore = create(
  persist<UserConfigState>(
    (set) => ({
      notifications: {
        browser: false,
        telegram: false,
        sendToProcess: false,
      },

      orders: {
        maxSum: 1000,
      },

      setNotifications: (newConfig) =>
        set((state) => ({
          notifications: { ...state.notifications, ...newConfig },
        })),
    }),
    { name: "config" },
  ),
);

export default useUserConfigStore;
