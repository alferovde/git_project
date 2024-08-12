import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { gitSlice } from "../Data/gitSlice";

export const store = configureStore({
  reducer: { git: gitSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
