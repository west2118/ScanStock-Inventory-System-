import { useEffect, useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTableParams } from "../../../hooks/useTableParams";
import { useDebounceInput } from "../../../hooks/useDebounceInput";
import { fetchTableData } from "../../../utils/utils";
import type { ProductType } from "../../../utils/types";

type CollectionsData = {
  collections: ProductType[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const useCollections = () => {
  const { params, setParams } = useTableParams({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    categoryId: "",
    brandId: "",
  });

  const filters = useMemo(
    () => ({
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search || "",
      status: params.status || "",
      categoryId: params.categoryId || "",
      brandId: params.brandId || "",
    }),
    [params],
  );

  const [searchInput, setSearchInput] = useState(filters.search);

  const debouncedSearch = useDebounceInput(searchInput);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setParams({
        search: debouncedSearch,
        page: 1,
      });
    }
  }, [debouncedSearch, filters.search, setParams]);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const query = useQuery<CollectionsData>({
    queryKey: ["collections-data", filters],
    queryFn: fetchTableData(`${import.meta.env.VITE_API_URL}/collections`),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,

    filters,
    params,
    setParams,

    searchInput,
    setSearchInput,
  };
};
