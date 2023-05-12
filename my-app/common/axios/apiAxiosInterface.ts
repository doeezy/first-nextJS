import { AxiosInstance, AxiosRequestConfig } from "axios";

// export interface APIDataResponse<T> {
//   result?: T;
//   message?: string;
//   code?: string;
//   status?: boolean;
// }

export interface commonResponse<T> {
  data: T;
  status: number;
}

export interface apiAxiosInterface extends AxiosInstance {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}
