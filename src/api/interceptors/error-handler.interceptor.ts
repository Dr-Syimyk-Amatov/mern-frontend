import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { baseInstance } from "../base";

export const createErrorHandlerInterceptor = (navigate: NavigateFunction) => {
  return function (error: AxiosError): any {
    if (error.response?.status === 405) {
      return navigate("/login");
    }

    throw error;
  };
};

export const initErrorHandler = (navigate: NavigateFunction) => {
  baseInstance.interceptors.response.use(null, createErrorHandlerInterceptor(navigate));
};
