import axios from "axios";
import {
  apiAxiosInterface,
  commonResponse
} from "@/common/axios/apiAxiosInterface";

//create an axios instance
const api: apiAxiosInterface = axios.create({
  baseURL: ""
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

let errMsg = "시스템 에러가 발생했습니다. 관리자에게 문의하세요.";
api.interceptors.response.use(
  async (response: commonResponse<any>) => {
    return response.data;
  },

  (error) => {
    return Promise.reject(error);
  }
);
export default api;
