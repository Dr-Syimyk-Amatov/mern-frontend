import { createContext, useContext, useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { User, getMe } from "../api";
import { LoadingState } from "../enums";
import { ErrorSnackbar } from "../components/error-snackbar";

export interface UserContextType {
  user: User | null;
  loadingState: LoadingState;
  reload: () => void;
}

const initialContext: UserContextType = {
  user: null,
  loadingState: LoadingState.Idle,
  reload: () => {},
};

const UserContext = createContext<UserContextType>(initialContext);

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.Idle);
  const fetchUser: () => Promise<void> = async () => {
    setLoadingState(LoadingState.Fetching);
    try {
      const response = await getMe();
      setUser(response.data);
      setLoadingState(LoadingState.Completed);
    } catch (error) {
      setUser(null);
      setLoadingState(LoadingState.Failed);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const reload = (): void => {
    fetchUser();
  };

  switch (loadingState) {
    case LoadingState.Idle:
    case LoadingState.Fetching:
      return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%" }}>
          <CircularProgress size={150} />
        </Box>
      );
    case LoadingState.Failed:
      return <ErrorSnackbar>{"Failed to load user!"}</ErrorSnackbar>;
    default:
      return <UserContext.Provider value={{ user, loadingState, reload }}>{children}</UserContext.Provider>;
  }
};

export const useUser = (): UserContextType => useContext(UserContext);
