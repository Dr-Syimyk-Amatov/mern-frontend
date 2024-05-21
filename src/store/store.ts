import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./user/user.slice";
import prioritiesReducer from "./priorities/priorities.slice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    priorities: prioritiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
