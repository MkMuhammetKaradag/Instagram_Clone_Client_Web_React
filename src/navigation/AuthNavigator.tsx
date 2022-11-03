import React from "react";
import { Routes, Route } from "react-router-dom";
import SignInPage from "../pages/auth/SignInPage";
import SignUpPage from "../pages/auth/SignUpPage";
const AuthNavigator = () => {
  return (
    <Routes>
      <Route path="/SignUp" element={<SignUpPage></SignUpPage>}></Route>
      <Route path="/*" element={<SignInPage></SignInPage>}></Route>
    </Routes>
  );
};

export default AuthNavigator;
