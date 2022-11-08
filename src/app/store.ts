import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authReducer from "../context/Auth/authSlice";
import userReducer from "../context/User/userSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
