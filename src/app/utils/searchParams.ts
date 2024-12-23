"use client";

import {
  useRouter,
  useSearchParams as useNextSearchParams,
} from "next/navigation";

export function useQueryParams() {
  const router = useRouter();
  const searchParams = useNextSearchParams();

  const pageSize = parseInt(searchParams.get("page") ?? "1");
  const searchTerm = searchParams.get("search") ?? "";

  const updateParams = ({
    page,
    search,
  }: {
    page?: number;
    search?: string;
  }) => {
    const params = new URLSearchParams(searchParams);

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
