import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../componnets/Header";

import HomePage from "../pages/app/HomePage";
import ProfilePage from "../pages/app/ProfilePage";
const AppNavigator = () => {
  return (
    <>
      <Header></Header>
      <div className="container mx-auto pt-4">
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route
            path="/user/:userName"
            element={<ProfilePage></ProfilePage>}
          ></Route>
        </Routes>
      </div>
    </>
  );
};

export default AppNavigator;
