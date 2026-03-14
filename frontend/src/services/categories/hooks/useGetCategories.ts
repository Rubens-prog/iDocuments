import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../categorie";

export function useGetCategories() {
  return useQuery({
    queryKey: ["useGetCategories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
