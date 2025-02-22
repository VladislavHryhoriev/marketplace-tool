import { create } from "zustand";

interface NotificationState {
  notificationIds: Set<number>;
  isPolling: boolean;
  togglePolling: () => void;
  addNotificationId: (id: number) => void;
  clearNotifications: () => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  notificationIds: new Set([]),
  isPolling: false,
  togglePolling: () => set((prev) => ({ isPolling: !prev.isPolling })),

  addNotificationId: (id: number) => {
    set((prev) => {
      const newSet = new Set(prev.notificationIds);
      newSet.add(id);
      return { notificationIds: newSet };
    });
  },

  clearNotifications: () => set({ notificationIds: new Set([]) }),
}));

export default useNotificationStore;
