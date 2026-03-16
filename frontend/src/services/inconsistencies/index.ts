import { api } from "../api";

export interface Category {
  id: number;
  name: string;
}

export interface Inconsistency {
  id: number;
  name: string;
  email: string;
  category: Category;
  description: string;
  file_path: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface GetInconsistenciesParams {
  search?: string;
  page?: number;
}

export function getInconsistencies(
  params: GetInconsistenciesParams,
): Promise<PaginatedResponse<Inconsistency>> {
  return new Promise((resolve, reject) => {
    api
      .get(`/api/inconsistencies`, {
        params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((res) => {
        reject(res);
      });
  });
}

export function findInconsistency(id: number): Promise<Inconsistency> {
  return new Promise((resolve, reject) => {
    api
      .get(`/api/inconsistencies/show/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((res) => {
        reject(res);
      });
  });
}

export interface CreateInconsistencyDTO {
  name: string;
  email: string;
  description: string;
  category_id: number;
  file: File;
}

export async function createInconsistency(
  data: CreateInconsistencyDTO,
): Promise<any> {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("description", data.description);
  formData.append("category_id", String(data.category_id));
  formData.append("file", data.file);

  const response = await api.post("/api/inconsistencies", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export function downloadPDF(id: number) {
  return api.get(`/api/inconsistencies/${id}/file`, {
    responseType: "blob",
  });
}
