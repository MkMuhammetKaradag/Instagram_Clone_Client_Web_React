import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

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
  const chats = useAppSelector((s) => s.user.chats);
  const user = useAppSelector((s) => s.auth.user);
  // console.log(chats);
  const newChats =
    chats &&
    chats.map(({ users, _id }) => ({
      _id: _id,
      users:
        users &&
        users.filter(
          (chatUser) => chatUser.userNickName !== user?.userNickName
        ),
    }));
  // console.log("asas", newChats);
  return (
    <div className="h-[calc(100%-70px)] overflow-auto ">
      <header className="flex  items-center justify-between px-3 py-5 mb-1">
        <h6 className="text-base font-semibold">Messages</h6>
        <button className="text-brand text-sm font-semibold">17 request</button>
        {/* <p>{chatId}</p> */}
      </header>
      {newChats &&
        newChats.map((chat) => (
          <NavLink
            to={`/inbox/${chat._id}`}
            key={chat._id}
            className={`h-[72px] flex items-center gap-x-4 hover:bg-zinc-50 px-5 ${
              chat && "font-semibold"
            }  ${chatId && chatId == chat._id && "!bg-[#efefef]"}  `}
          >
            <img
              src={
                (chat && chat.users && chat.users[0].userProfilePicture) ||
                "null"
              }
              className="w-14 h-14 rounded-full"
              alt=""
            />
            <div>
              <h6 className="text-sm">
                {chat && chat.users && chat.users[0].userNickName}
              </h6>
              <p className={`text-sm ${!chat && "text-[#8e8e8e]"}`}>
                {chat && chat.users && chat.users[0].userNickName}
              </p>
            </div>
          </NavLink>
        ))}
    </div>
  );
};

export default ChatList;
