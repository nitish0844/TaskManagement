import { create } from "zustand";

export const useTaskLoadingStore = create((set) => ({
  taskLoading: false,
  setTaskLoading: (value) => set({ taskLoading: value }),
}));

export const useScreenLoading = create((set) => ({
  screenLoading: false,
  setScreenLoading: (value) => set({ screenLoading: value }),
}));
