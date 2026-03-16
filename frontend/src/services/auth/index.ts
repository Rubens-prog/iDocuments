import { api } from "@services/api";

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponseDTO {
  name: string;
  email: string;
  token: string;
}

export function login(params: LoginParams): Promise<LoginResponseDTO> {
  return new Promise((resolve, reject) => {
    const { email, password } = params;
    api
      .post(`/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((res) => {
        reject(res);
      });
  });
}

export function logout() {
  return new Promise((resolve, reject) => {
    api
      .post(`/auth/logout`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((res) => {
        reject(res);
      });
  });
}
