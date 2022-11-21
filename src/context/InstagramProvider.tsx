import { Provider } from "react-redux";
import React, { useEffect, useState } from "react";

import { configureStore } from "@reduxjs/toolkit";
import AuthReducer, { User } from "./Auth/authSlice";
import UserReducer, { setMyFollowRequests } from "./User/userSlice";
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
  const [userLikes, setUserLikes] = useState<string[]>([]);
  const [userMyFollowRequests, setUserMyFollowRequests] = useState<string[]>(
    []
  );
  const [userFollowRequests, setUserFollowRequests] = useState<string[]>([]);
  const [userFollowers, setUserFollowers] = useState<string[]>([]);
  const [userFollowUps, setUserFollowUps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((data) => {
        console.log("provider->", data.data.user);
        setUser(data.data.user);
        setUserLikes(
          data.data.user?.userLikes ? data.data.user?.userLikes : []
        );
        setUserFollowUps(
          data.data.user?.followUps ? data.data.user?.followUps : []
        );
        setUserMyFollowRequests(
          data.data.user?.myFollowRequests
            ? data.data.user?.myFollowRequests
            : []
        );
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
        likes: userLikes,
        myFollowRequests: userMyFollowRequests,
        followRequests: userFollowRequests,
        followers: userFollowers,
        followUps: userFollowUps,
      },
    },
  });
  return <Provider store={userStore}>{children}</Provider>;
};

export default InstagramProvider;
