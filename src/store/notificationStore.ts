import { create } from "zustand";

interface NotificationState {
  notifiedOrdersIds: number[];
  addNotifiedOrderId: (id: number) => void;
  setNotifiedOrdersIds: (ids: number[]) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifiedOrdersIds: [],
  addNotifiedOrderId: (id: number) =>
    set((prev) => ({
      notifiedOrdersIds: prev.notifiedOrdersIds.includes(id)
        ? prev.notifiedOrdersIds
        : [...prev.notifiedOrdersIds, id],
    })),

  setNotifiedOrdersIds: (ids: number[]) =>
    set({ notifiedOrdersIds: Array.from(new Set(ids)) }),
}));
