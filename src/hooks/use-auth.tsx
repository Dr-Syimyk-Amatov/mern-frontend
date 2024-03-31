import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./use-local-storage";
import * as authApi from "../api";

export interface AuthContextType {
  login: (user: authApi.LoginBody) => Promise<void>;
  logout: () => void;
  user?: authApi.UserWithToken;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useLocalStorage<authApi.UserWithToken | undefined>("user", undefined);
  const navigate = useNavigate();

  // Call this function when you want to authenticate the user
  const login: AuthContextType["login"] = async (loginBody: authApi.LoginBody): Promise<void> => {
    const user = await authApi.login(loginBody);
    setUser(user.data);
    navigate("/");
  };

  // Call this function to sign out logged in user
  const logout: AuthContextType["logout"] = () => {
    setUser(undefined);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
