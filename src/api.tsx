import axios from "axios";

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

type SignupRequest = {
  email: string;
  password: string;
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

export const postSignup = async (input: SignupRequest) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/Auth/signup`, input);
    return { data };
  } catch (error) {
    console.log(error);
  }
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
