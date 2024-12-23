import { create } from "zustand";

type SearchParamsStore = {
  parsedParams: {
    page?: string;
    search?: string;
  };
  setParams: (params: { page?: string; search?: string }) => void;
};

export const useParamsStore = create<SearchParamsStore>((set) => ({
  parsedParams: {
    page: "1",
    search: "",
  },
  setParams: (params) => set({ parsedParams: params }),
}));
