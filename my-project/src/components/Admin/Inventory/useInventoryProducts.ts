import { useEffect, useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounceInput } from "../../../hooks/useDebounceInput";
import { useTableParams } from "../../../hooks/useTableParams";
import type { ProductsData } from "../../../utils/types";
import { fetchTableData } from "../../../utils/utils";

const API_URL = import.meta.env.VITE_API_URL;

export const useInventoryProducts = () => {
  const { params, setParams } = useTableParams({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    category: "",
  });

  const filters = useMemo(
    () => ({
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search || "",
      status: params.status || "",
      category: params.category || "",
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

  const query = useQuery<ProductsData>({
    queryKey: ["products-data", filters],
    queryFn: fetchTableData(`${API_URL}/products`),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    params,
    setParams,
    filters,
    searchInput,
    setSearchInput,
  };
};
