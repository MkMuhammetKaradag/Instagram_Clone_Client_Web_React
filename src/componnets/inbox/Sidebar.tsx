import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import ChatList from "../Chat/ChatList";
import { useParams } from "react-router-dom";
const Sidebar = () => {
  const user = useAppSelector((S) => S.auth.user);

  return (
    <aside className="w-[435px] flex-shrink border-r  bortder-gray-300">
      <header className="h-[70px] border-b  border-gray-300 flex justify-between items-center  px-4">
        <button className="flex items-center mx-auto gap-x-3 text-base font-semibold">
          {user?.userNickName} <IoIosArrowDown size={24}></IoIosArrowDown>
        </button>

        <FaRegEdit size={24}></FaRegEdit>
      </header>
      <ChatList></ChatList>
    </aside>
  );
};

export default Sidebar;
