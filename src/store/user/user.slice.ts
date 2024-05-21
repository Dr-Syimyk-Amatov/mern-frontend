import { PayloadAction, SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, getMe } from "../../api";
import { LoadingState } from "../../enums";

export interface UsersState {
  me: User | null;
  meLoadState: LoadingState;
  error: SerializedError | null;
}

const initialState: UsersState = {
  me: null,
  meLoadState: LoadingState.Idle,
  error: null,
};

export const fetchUser = createAsyncThunk("users", async () => {
  try {
    const response = await getMe();
    return response.data;
  } catch (error) {
    throw new Error("Failed to load user!");
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loadMe: (state) => {
      state.meLoadState = LoadingState.Fetching;
    },
    loadMeCompleted: (state, { payload }: PayloadAction<User>) => {
      state.me = payload;
      state.meLoadState = LoadingState.Completed;
    },
    loadMeFailed: (state) => {
      state.meLoadState = LoadingState.Failed;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.meLoadState = LoadingState.Fetching;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.me = payload!;
        state.meLoadState = LoadingState.Completed;
      })
      .addCase(fetchUser.rejected, (state, { error }) => {
        state.error = error;
        state.meLoadState = LoadingState.Failed;
      });
  },
});

export const { loadMe, loadMeCompleted, loadMeFailed } = usersSlice.actions;
export default usersSlice.reducer;
