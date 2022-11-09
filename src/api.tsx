import axios from "axios";
import toast from "react-hot-toast";
import { ChatsType } from "./context/User/userSlice";

type userLoginType = {
  email: string;
  password: string;
};
type userType = {
  email: string;
  userProfilePicture?: string;
  _id: string;
  userNickName: string;
};

type PostUserType = {
  userProfilePicture: string | null;
  _id: string;
  userNickName: string;
};
type userLoginRequestType = {
  message: string;
  data: {
    user: userType | null;
  };
};

type SignupType = {
  email: string;
  password: string;
  userNickName: string;
};

export type getUserType = {
  email: string;
  userProfilePicture: string | null;
  _id: string;
  userNickName: string;
  followUps: number | PostUserType[];
  followers: number | PostUserType[];
  userPosts: PostType_2[];
  profilePrivate: boolean;
};

type getUserRequestType = {
  message: string;
  data: {
    user: getUserType | null;
  };
};

export type messageType = {
  _id: string;
  from: string;
  MessageText: string;
  __v: number;
};

type getChatsRequestType = {
  message: string;
  data: {
    chats: ChatsType[] | null;
  };
};
export type ChatMessage = {
  _id: string;
  from: {
    userProfilePicture: string | null;
    _id: string;
    userNickName: string;
  };
  MessageText: string;
  created_at: string;
  updatedAt: string;
};

export type PostType = {
  _id: string;
  description: string;
  type: string;
  hastags: string[];
  likes: PostUserType[];
  owner: PostUserType;
  comments: {
    _id: string;
    description: string;
    user: PostUserType;
  }[];
  total_views: number;
  video_url: string | null;
  image_url: string | null;
  createdAt: string;
};

export type PostType_2 = {
  _id: string;
  description: string;
  type: string;
  hastags: string[];
  likes: PostUserType[];
  comments: {
    _id: string;
    description: string;
    user: PostUserType;
  }[];
  total_views: number;
  video_url: string | null;
  image_url: string | null;
  createdAt: string;
};

type getMyFollowUpsPostsRequestType = {
  message: string;
  data: {
    myFollowUpsPosts: PostType[];
  };
};

type getChatMessagesRequestType = {
  message: string;
  data: {
    messages: {
      _id: string;
      users: string[];
      Messages: ChatMessage[] | [];
    };
  };
};
const PROD_URL = "*";
const LOCAL_URL = "http://localhost:8080";
export const BASE_URL = LOCAL_URL;

export const getLogin = async (
  input: userLoginType
): Promise<userLoginRequestType> => {
  const { data } = await axios.post(`${BASE_URL}/Auth/login`, input, {
    withCredentials: true,
  });
  return data;
};

export const postSignup = async (input: SignupType) => {
  const { data } = await axios.post(`${BASE_URL}/Auth/signup`, input);
  return data;
};

export const getMe = async (): Promise<userLoginRequestType> => {
  const { data } = await axios.get(`${BASE_URL}/Auth/me`, {
    withCredentials: true,
  });
  return data;
};

export const getLogout = async (): Promise<userLoginRequestType> => {
  const { data } = await axios.get(`${BASE_URL}/Auth/logout`, {
    withCredentials: true,
  });
  return data;
};

export const getUser = async (
  userNickName: string | undefined
): Promise<getUserRequestType | null> => {
  try {
    const res = await axios.get(`${BASE_URL}/User/${userNickName}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw new Error("Kullanıcı Bulunamadı");
  }
};

export const getChats = async (): Promise<getChatsRequestType | null> => {
  const { data } = await axios.get(`${BASE_URL}/Chats`, {
    withCredentials: true,
  });
  return data;
};

export const getChatMessages = async (
  chatId: string
): Promise<getChatMessagesRequestType> => {
  const { data } = await axios.get(`${BASE_URL}/Chats/messages/${chatId}`, {
    withCredentials: true,
  });
  return data;
};

export const getMyFollowUpsPosts =
  async (): Promise<getMyFollowUpsPostsRequestType> => {
    const { data } = await axios.get(`${BASE_URL}/Post/myFollowUpsPosts`, {
      withCredentials: true,
    });
    return data;
  };
