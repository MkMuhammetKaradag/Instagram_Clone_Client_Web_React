import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../componnets/Header";

import HomePage from "../pages/app/HomePage";
import ProfilePage from "../pages/app/Profile/ProfilePage";
import ProfileTagged from "../pages/app/Profile/ProfileTagged";
import ProfilePost from "../pages/app/Profile/ProfilePost";
const AppNavigator = () => {
  return (
    <>
      <Header></Header>
      <div className="container mx-auto pt-4">
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/user/:userName" element={<ProfilePage></ProfilePage>}>
            <Route path="posts" element={<ProfilePost></ProfilePost>} />
            <Route path="tagged" element={<ProfileTagged />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default AppNavigator;
