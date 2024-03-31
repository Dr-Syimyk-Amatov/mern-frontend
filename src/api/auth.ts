import axios, { AxiosResponse } from "axios";
import { CreateUser, LoginBody, UserWithToken } from "./models";

const instance = axios.create({
  baseURL: "http://localhost:4444/auth",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

export async function registerUser(body: CreateUser): Promise<AxiosResponse<UserWithToken>> {
  return instance.post<UserWithToken>("/register", body);
}

export async function login(body: LoginBody): Promise<AxiosResponse<UserWithToken>> {
  return instance.post<UserWithToken>("/login", body);
}
