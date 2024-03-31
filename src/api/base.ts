import axios from "axios";
import { authInterceptor } from "./interceptors/auth.interceptor";

export const baseInstance = axios.create({
  baseURL: "http://localhost:4444",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

baseInstance.interceptors.request.use(authInterceptor);
