import { api } from "../api";

interface Categories {
  id: number;
  name: string;
}

export function getCategories(): Promise<Categories[]> {
  return new Promise((resolve, reject) => {
    api
      .get(`/api/categories`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((res) => {
        reject(res);
      });
  });
}
