import React from "react";
import { Routes, Route } from "react-router-dom";
import SignInPage from "../pages/auth/SignInPage";
const AuthNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInPage></SignInPage>}></Route>
    </Routes>
  );
};

export default AuthNavigator;
