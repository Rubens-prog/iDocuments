import { useQuery } from "@tanstack/react-query";
import { findInconsistency } from "..";

export function useFindInconsistency(id: number) {
  return useQuery({
    queryKey: ["useFindInconsistency", { id }],
    queryFn: () => findInconsistency(id),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
  });
}
