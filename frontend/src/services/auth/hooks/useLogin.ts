import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "..";
import Swal from "sweetalert2";
import { api } from "@services/api";
import { setStorageToken, setStorageUser } from "@storage/auth-storage";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      const { email, name } = data;

      Swal.fire({
        title: "Login efetuado",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        icon: "success",
      });

      queryClient.invalidateQueries({
        queryKey: ["login"],
      });

      setStorageToken(data.token);
      setStorageUser({
        email,
        name,
      });
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    },
  });
}
