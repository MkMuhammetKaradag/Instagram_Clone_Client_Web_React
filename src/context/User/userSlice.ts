import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChatUserType {
  userProfilePicture?: string;
  _id: string;
  userNickName: string;
}

export interface ChatsType {
  _id: string;
  users: ChatUserType[] | null;
}

export interface UserStateType {
  chats: ChatsType[] | null;
}

const initialState: UserStateType = {
  chats: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setChats: (state, action: PayloadAction<ChatsType[] | null>) => {
      //   console.log("user Slice?  sasasasas");
      state.chats = action.payload;
    },
  },
});

export const { setChats } = userSlice.actions;

export default userSlice.reducer;
