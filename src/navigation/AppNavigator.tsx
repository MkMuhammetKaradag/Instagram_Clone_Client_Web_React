import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../componnets/Header";

import HomePage from "../pages/app/HomePage";
import ProfilePage from "../pages/app/Profile/ProfilePage";
import ProfileTagged from "../pages/app/Profile/ProfileTagged";
import ProfilePost from "../pages/app/Profile/ProfilePost";

import InboxLayout from "../pages/app/inbox";
import Inbox from "../pages/app/inbox/Inbox";
import Chat from "../pages/app/inbox/Chat";
import { socket, WebSocketProvider } from "../context/WebSocketContext";
const AppNavigator = () => {
  return (
    <>
      {/* <WebSocketProvider value={socket}> */}
      <Header></Header>
      <div className="container mx-auto pt-4">
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/user/:userName" element={<ProfilePage></ProfilePage>}>
            <Route path="posts" element={<ProfilePost></ProfilePost>} />
            <Route path="tagged" element={<ProfileTagged />} />
          </Route>
          <Route path="/inbox" element={<InboxLayout></InboxLayout>}>
            <Route path="" element={<Inbox></Inbox>}></Route>
            <Route path=":chatId" element={<Chat></Chat>}></Route>
          </Route>
        </Routes>
      </div>
      {/* </WebSocketProvider> */}
    </>
  );
};

export default AppNavigator;
