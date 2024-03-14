import { ReduxToolkitSlice } from "@/enums/slice.enum";
import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "../slices/task.slice";

export const store = configureStore({
  reducer: {
    [ReduxToolkitSlice.TASK]: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkAPI = { state: RootState; dispatch: AppDispatch };
