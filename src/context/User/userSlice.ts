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
  likes: string[];
}

const initialState: UserStateType = {
  chats: null,
  likes: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setChats: (state, action: PayloadAction<ChatsType[] | null>) => {
      //   console.log("user Slice?  sasasasas");
      state.chats = action.payload;
    },
    setLike: (state, action: PayloadAction<string>) => {
      state.likes.push(action.payload);
    },
    removeLike: (state, action: PayloadAction<string>) => {
      let index = state.likes.findIndex((s) => s == action.payload);
      if (index > -1) {
        state.likes.splice(index, 1);
      }
    },
  },
});

export const { setChats, setLike, removeLike } = userSlice.actions;

export default userSlice.reducer;
