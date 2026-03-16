import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInconsistency } from "..";
import Swal from "sweetalert2";

export function useCreateInconsistency() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInconsistency,

    onSuccess: (data) => {
      Swal.fire({
        title: data.message,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        icon: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["inconsistencies"],
      });
    },
  });
}
