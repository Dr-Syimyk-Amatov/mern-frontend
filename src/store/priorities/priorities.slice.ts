import { PayloadAction, SerializedError, ThunkDispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Priority, PrioritySortKey, getPriorities } from "../../api";
import { LoadingState, SortOrder } from "../../enums";
import { AppDispatch, RootState } from "../store";

export interface PrioritiesState {
  list: Priority[];
  loadState: LoadingState;
  error: SerializedError | null;
  sortKey: PrioritySortKey;
  sortOrder: SortOrder;
}

const initialState: PrioritiesState = {
  list: [],
  loadState: LoadingState.Idle,
  error: null,
  sortKey: "title",
  sortOrder: SortOrder.Asc,
};

type SortKeyParam = { sortKey: PrioritySortKey };
type SortOrderParam = { sortOrder: SortOrder };
type FetchPrioritiesParams = SortKeyParam | SortOrderParam | (SortKeyParam & SortOrderParam);

export const setSortParamsAction = (dispatch: ThunkDispatch<{}, {}, any>, sortParams: FetchPrioritiesParams) => {
  if ("sortKey" in sortParams) {
    dispatch(prioritiesSlice.actions.setSortKey(sortParams.sortKey));
  } else {
    dispatch(prioritiesSlice.actions.setSortOrder(sortParams.sortOrder));
  }

  dispatch(fetchPriorities());
};

export const fetchPriorities = createAsyncThunk<
  Priority[],
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("priorities", async (_, { rejectWithValue, getState }) => {
  const { sortKey, sortOrder } = getState().priorities;
  try {
    const response = await getPriorities({ sortKey, sortOrder });
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const prioritiesSlice = createSlice({
  name: "priorities",
  initialState,
  reducers: {
    setSortParams: (state, { payload }: PayloadAction<FetchPrioritiesParams>) => {
      if ("sortKey" in payload) {
        state.sortKey = payload.sortKey;
      }

      if ("sortOrder" in payload) {
        state.sortOrder = payload.sortOrder;
      }
    },
    setSortOrder: (state, { payload }: PayloadAction<SortOrder>) => {
      state.sortOrder = payload;
    },
    setSortKey: (state, { payload }: PayloadAction<PrioritySortKey>) => {
      state.sortKey = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriorities.pending, (state) => {
        state.loadState = LoadingState.Fetching;
      })
      .addCase(fetchPriorities.fulfilled, (state, { payload }) => {
        state.loadState = LoadingState.Completed;
        state.list = payload;
      })
      .addCase(fetchPriorities.rejected, (state, { error }) => {
        state.loadState = LoadingState.Failed;
        state.error = error;
        state.list = [];
      });
  },
});

export const { setSortOrder, setSortKey, setSortParams } = prioritiesSlice.actions;
export default prioritiesSlice.reducer;
