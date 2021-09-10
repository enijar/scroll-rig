import create from "zustand";
import { ScrollApi } from "../../../lib/scroll";

type Store = {
  scrollApi: ScrollApi | null;
  setScrollApi: (scrollApi: ScrollApi | null) => void;
};

export const useSore = create<Store>((set) => {
  return {
    scrollApi: null,
    setScrollApi(scrollApi: ScrollApi | null) {
      set({ scrollApi });
    },
  };
});
