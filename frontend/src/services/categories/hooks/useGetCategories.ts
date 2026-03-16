import { useQuery } from "@tanstack/react-query";
import { getCategories } from "..";

export function useGetCategories() {
  return useQuery({
    queryKey: ["useGetCategories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
