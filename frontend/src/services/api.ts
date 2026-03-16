import { getStorageToken } from "@storage/auth-storage";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const token = getStorageToken();

export const api = axios.create({
  baseURL: `${API_URL}`,
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("error =>", error);
    const errorMessage =
      error.response.data.message ||
      "Ops! Ocorreu um erro inesperado. Tente novamente mais tarde.";

    Toast.fire({
      icon: "error",
      title: errorMessage,
    });
  },
);

if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
