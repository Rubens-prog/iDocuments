import axios from "axios";
import Swal from "sweetalert2";

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

export const api = axios.create({
  baseURL: `http://localhost:8000`,
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("error =>", error);
    const errorMessage =
      error.response.data.message || error.response.data.error || error.message;

    Toast.fire({
      icon: "error",
      title: errorMessage,
    });
  },
);
