import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  email: string;
  userProfilePicture?: string;
  _id: string;
  userNickName: string;
}

export interface AuthState {
  user: User | null;
  isAuthLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
