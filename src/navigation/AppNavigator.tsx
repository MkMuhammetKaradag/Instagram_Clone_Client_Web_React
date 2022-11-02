import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../componnets/Header";

import HomePage from "../pages/app/HomePage";
const AppNavigator = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
      </Routes>
    </>
  );
};

export default AppNavigator;
