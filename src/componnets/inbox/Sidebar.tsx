import React, { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ChatList from "../Chat/ChatList";
import { useParams } from "react-router-dom";
import { getChats } from "../../api";
import { setChats } from "../../context/User/userSlice";
const Sidebar = () => {
  const user = useAppSelector((S) => S.auth.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    getChats()
      .then((res) => {
        if (res?.data.chats) {
          // console.log(res.data.chats);
          dispatch(setChats(res.data.chats));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <aside className="min-w-[435px] flex-shrink border-r  bortder-gray-300">
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
