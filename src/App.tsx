import React, { useEffect } from "react";
import logo from "./logo.svg";

import "./App.css";
import Login from "./pages/auth/SignInPage";
import RootNavigator from "./navigation/RootNavigator";
import { useAppSelector } from "./app/hooks";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FaInstagram } from "react-icons/fa";
function App() {
  const userSession = useAppSelector((s) => s.auth.user);
  const isAuthLoading = useAppSelector((s) => s.auth.isAuthLoading);
  useEffect(() => {
    console.log("nive");
  }, []);

  return (
    <div className="h-full w-full">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      {/* <Login></Login> */}
      {!isAuthLoading ? (
        <BrowserRouter>
          <RootNavigator userSession={userSession}></RootNavigator>
        </BrowserRouter>
      ) : (
        <div className="w-full h-full top-0 left-0 bg-white text-pink-600 flex-col  flex items-center justify-center text-2xl ">
          <FaInstagram size={100}></FaInstagram>
          <h6>Instagram</h6>
        </div>
      )}
    </div>
  );
}

export default App;
