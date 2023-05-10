import { AxiosInstance, AxiosRequestConfig } from "axios";

export interface APIDataResponse<T> {
  result: number;
  errorMessage: string;
  data?: T;
}

export interface commonResponse<T> {
  data: APIDataResponse<T>;
  status: number;
}

export interface apiAxiosInterface extends AxiosInstance {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}
