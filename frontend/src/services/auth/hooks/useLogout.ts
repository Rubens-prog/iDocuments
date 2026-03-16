import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "..";
import { api } from "@services/api";
import { removeStorageToken, removeStorageUser } from "@storage/auth-storage";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["logout"],
      });

      removeStorageUser();
      removeStorageToken();

      api.defaults.headers.common["Authorization"] = ``;
    },
  });
}
