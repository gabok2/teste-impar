"use client";

import { useRouter } from "next/navigation";
import { useParamsStore } from "../store/queryParams";

export function useQueryParams() {
  const { parsedParams } = useParamsStore();
  const router = useRouter();

  const pageSize = parseInt(parsedParams?.page ?? "1");
  const searchTerm = parsedParams?.search ?? "";

  const updateParams = ({
    page,
    search,
  }: {
    page?: number;
    search?: string;
  }) => {
    const params = new URLSearchParams();

    const currentPage = parsedParams?.page;
    const currentSearch = parsedParams?.search;

    if (currentPage) params.set("page", currentPage);
    if (currentSearch) params.set("search", currentSearch);

    if (page !== undefined) {
      params.set("page", String(page));
    }
    if (search !== undefined) {
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
    }

    router.replace(`?${params.toString()}`, {
      scroll: false,
    });
  };

  return {
    pageSize,
    searchTerm,
    updateParams,
  };
}
