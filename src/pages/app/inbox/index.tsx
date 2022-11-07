import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../componnets/inbox/Sidebar";

const InboxLayout = () => {
  return (
    <div className="border  border-gray-300 bg-white h-[calc(100vh-100px)] rounded flex">
      <Sidebar></Sidebar>
      <Outlet></Outlet>
    </div>
  );
};

export default InboxLayout;
