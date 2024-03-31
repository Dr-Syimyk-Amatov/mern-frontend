import { InternalAxiosRequestConfig } from "axios";
import { UserWithToken } from "../models";

function getUserFromLocalStorage(): UserWithToken | null {
  const rawUser = localStorage.getItem("user");
  if (!rawUser) return null;
  let user: UserWithToken | null;
  try {
    user = JSON.parse(rawUser);
    if (typeof user !== "object") throw Error("User's value isn't valid!");
  } catch (error) {
    user = null;
    console.error(error);
  }

  return user;
}

export function authInterceptor(config: InternalAxiosRequestConfig) {
  const user = getUserFromLocalStorage();
  const hasToken = user && user.token;
  if (hasToken) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}
