import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchData, fetchTableData } from "../../../utils/utils";

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands-data"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/brands`),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};
