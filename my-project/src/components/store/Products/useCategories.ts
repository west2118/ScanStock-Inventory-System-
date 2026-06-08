import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../utils/utils";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories-data"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/categories`),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};
