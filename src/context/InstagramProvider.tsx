import { Provider } from "react-redux";
import React, { useEffect, useState } from "react";

import { configureStore } from "@reduxjs/toolkit";
import AuthReducer, { User } from "./Auth/authSlice";
import UserReducer from "./User/userSlice";
import { getMe } from "../api";
import { useCookies } from "react-cookie";
// import {
//     createContext,
//     useState,
//     useEffect,
//     useContext,
//     ReactChildren,
//     ReactChild,
//   } from 'react';
interface InstagramProviderProps {
  children: React.ReactElement<any>;
}
const InstagramProvider = ({ children }: InstagramProviderProps) => {
  const reducer = {
    auth: AuthReducer,
    user: UserReducer,
  };
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((data) => {
        console.log("provider->");
        setUser(data.data.user);
      })
      .catch(() => {
        console.log("err");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const userStore = configureStore({
    reducer: reducer,
    preloadedState: {
      auth: {
        user: user,
        isAuthLoading: isLoading,
      },
      user: {
        chats: null,
      },
    },
  });
  return <Provider store={userStore}>{children}</Provider>;
};

export default InstagramProvider;
