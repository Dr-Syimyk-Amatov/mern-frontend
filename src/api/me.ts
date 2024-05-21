import { AxiosResponse } from "axios";
import { baseInstance } from "./base";
import { User } from "./models";

export async function getMe(): Promise<AxiosResponse<User>> {
  return baseInstance.get<User, AxiosResponse>("http://localhost:4444/auth/me", { url: "auth" });
}
