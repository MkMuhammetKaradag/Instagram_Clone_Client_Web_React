import React from "react";
import { NavLink, useParams } from "react-router-dom";

const Chat = [
  {
    id: "1",
    user: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5yTxBxqX7UPLILheEuZbgOuYver2PQLQxuQ&usqp=CAU",
      userName: "Deneme.dene",
    },
    lastMessage: "Selam Deneme!",
  },
  {
    id: "2",
    user: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMT3-A3BoHLW3BEGarYVhSG3ha0VvGsLbHIw&usqp=CAU",
      userName: "Deneme.dene-1",
    },
    unread: true,
    lastMessage: "Selam DenemeAAA!",
  },
  {
    id: "3",
    user: {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5yTxBxqX7UPLILheEuZbgOuYver2PQLQxuQ&usqp=CAU",
      userName: "Deneme.dene-1",
    },
    lastMessage: "Selam DenemeSSS!",
  },
];
const ChatList = () => {
  const { chatId } = useParams();
  return (
    <div className="h-[calc(100%-70px)] overflow-auto ">
      <header className="flex  items-center justify-between px-3 py-5 mb-1">
        <h6 className="text-base font-semibold">Messages</h6>
        <button className="text-brand text-sm font-semibold">17 request</button>
        {/* <p>{chatId}</p> */}
      </header>
      {Chat.map((chat) => (
        <NavLink
          to={`/inbox/${chat.id}`}
          key={chat.id}
          className={`h-[72px] flex items-center gap-x-4 hover:bg-zinc-50 px-5 ${
            chat.unread && "font-semibold"
          }  ${chatId && chatId == chat.id && "!bg-[#efefef]"}  `}
        >
          <img
            src={chat.user.avatar}
            className="w-14 h-12 rounded-full"
            alt=""
          />
          <div>
            <h6 className="text-sm">{chat.user.userName}</h6>
            <p className={`text-sm ${!chat.unread && "text-[#8e8e8e]"}`}>
              {chat.lastMessage}
            </p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default ChatList;
