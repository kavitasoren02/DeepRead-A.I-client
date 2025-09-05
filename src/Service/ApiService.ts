import axios, { AxiosError, type AxiosResponse , type AxiosRequestConfig} from "axios";
import { settings } from "../config/config";

const axiosInstance = axios.create({
  baseURL: settings.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(new Error(error.message || "Something went wrong"));
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const excludeRoute: string[] = ["api/auth/info"];

    const REDIRECT_STATUS_CODES = [401, 403, 429];

    if (
      error.response &&
      REDIRECT_STATUS_CODES.includes(error.response.status) &&
      !excludeRoute.includes(error?.config.url || "")
    ) {
      console.log("Redirecting from:", error.config?.url);

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export interface CustomAxiosResponse<T> extends AxiosResponse<T>{
    error?: string;
    message?: string;
}

export const _get = async <T>(url: string, config?: AxiosRequestConfig): Promise<CustomAxiosResponse<T>> => {
    const response = await axiosInstance.get(url, config);
    return response;
}

export const _post = async <T>(url: string, data: unknown, config?:AxiosRequestConfig):  Promise<CustomAxiosResponse<T>> => {
    const response = await axiosInstance.post(url, data, config);
    return response;
}

export const _put = async <T>(url: string, data: unknown, config?:AxiosRequestConfig):  Promise<CustomAxiosResponse<T>> => {
    const response = await axiosInstance.post(url, data, config);
    return response;
}

export const _delete = async <T>(url: string, config?:AxiosRequestConfig):  Promise<CustomAxiosResponse<T>> => {
    const response = await axiosInstance.post(url, config);
    return response;
}