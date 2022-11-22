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
  myFollowRequests: string[];
  followRequests: string[];
  followers: string[];
  followUps: string[];
}

const initialState: UserStateType = {
  chats: null,
  likes: [],
  myFollowRequests: [],
  followRequests: [],
  followers: [],
  followUps: [],
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
    setLikes: (state, action: PayloadAction<string[]>) => {
      state.likes = action.payload;
    },
    removeLike: (state, action: PayloadAction<string>) => {
      let index = state.likes.findIndex((s) => s == action.payload);
      if (index > -1) {
        state.likes.splice(index, 1);
      }
    },
    setMyFollowRequest: (state, action: PayloadAction<string>) => {
      state.myFollowRequests.push(action.payload);
    },
    setMyFollowRequests: (state, action: PayloadAction<string[]>) => {
      state.myFollowRequests = action.payload;
    },
    removeMyFollowRequest: (state, action: PayloadAction<string>) => {
      let index = state.myFollowRequests.findIndex((s) => s == action.payload);
      if (index > -1) {
        state.myFollowRequests.splice(index, 1);
      }
    },
    setFollowUp: (state, action: PayloadAction<string>) => {
      state.followUps.push(action.payload);
    },
    setFollowUps: (state, action: PayloadAction<string[]>) => {
      state.followUps = action.payload;
    },
    removeFollowUp: (state, action: PayloadAction<string>) => {
      let index = state.followUps.findIndex((s) => s == action.payload);
      if (index > -1) {
        state.followUps.splice(index, 1);
      }
    },
  },
});

export const {
  setChats,
  setLike,
  removeLike,
  setLikes,
  setMyFollowRequest,
  setMyFollowRequests,
  removeMyFollowRequest,
  setFollowUp,
  setFollowUps,
  removeFollowUp,
} = userSlice.actions;

export default userSlice.reducer;
