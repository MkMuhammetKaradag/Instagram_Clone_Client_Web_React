import axios from "axios";
import toast from "react-hot-toast";

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
  userProfilePicture?: string;
  _id: string;
  userNickName: string;
  followUps: number | string[];
  followers: number | string[];
  userPosts?: string[];
  gender: string | null;
  profilePrivate: boolean;
};

type getUserRequestType = {
  message: string;
  data: {
    user: getUserType | null;
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
