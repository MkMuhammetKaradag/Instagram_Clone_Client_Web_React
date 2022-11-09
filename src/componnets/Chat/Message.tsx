import React from "react";
import { ChatMessage } from "../../api";
import { useAppSelector } from "../../app/hooks";
type MessageProps = {
  message: ChatMessage;
};

const Message = ({ message }: MessageProps) => {
  const user = useAppSelector((s) => s.auth.user);
  return (
    <div
      className={`flex gap-x-2 max-w-[50%]  ${
        user?._id == message.from._id && "self-end"
      }`}
    >
      {user?._id !== message.from._id && (
        <img
          src={
            message.from.userProfilePicture
              ? message.from.userProfilePicture
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQjblwVQ-GlXCaTJnkev2wwBkrWAZQzUehfQ&usqp=CAU"
          }
          className={"w-6 h-6 rounded-full self-end"}
        ></img>
      )}
      <p
        style={{
          hyphens: "auto",
        }}
        className={`min-h-[44px] inline-flex items-center py-3  px-5  text-sm  rounded-3xl border ${
          user?._id !== message.from._id && "border-gray-200"
        }  ${user?._id === message.from._id && "bg-[#efefef]"} `}
      >
        {message.MessageText}
      </p>
    </div>
  );
};

export default Message;
