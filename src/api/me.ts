import { baseInstance } from "./base";
import { User } from "./models";

export async function me(): Promise<User> {
  return baseInstance.get<User, User>("http://localhost:4444/auth/me", { url: "auth" });
}
