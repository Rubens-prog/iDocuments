import { useInfiniteQuery } from "@tanstack/react-query";
import {
  getInconsistencies,
  type Inconsistency,
  type PaginatedResponse,
} from "..";

export function useGetInconsistencies(search?: string) {
  return useInfiniteQuery<PaginatedResponse<Inconsistency>>({
    queryKey: ["inconsistencies", search],

    queryFn: ({ pageParam = 1 }) =>
      getInconsistencies({
        search,
        page: pageParam as number,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.current_page < lastPage.last_page) {
        return lastPage.current_page + 1;
      }

      return undefined;
    },
  });
}
