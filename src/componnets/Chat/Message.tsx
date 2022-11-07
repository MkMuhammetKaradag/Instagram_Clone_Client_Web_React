import React from "react";
import { useAppSelector } from "../../app/hooks";
type MessageProps = {
  message: {
    from: {
      id: string;
      name: string;
      username: string;
      avatar: string;
    };
    message: string;
  };
};

const Message = ({ message }: MessageProps) => {
  const user = useAppSelector((s) => s.auth.user);
  return (
    <div
      className={`flex gap-x-2 max-w-[50%]  ${
        user?._id == message.from.id && "self-end"
      }`}
    >
      {user?._id !== message.from.id && (
        <img
          src={message.from.avatar}
          className={"w-6 h-6 rounded-full self-end"}
        ></img>
      )}
      <p
        style={{
          hyphens: "auto",
        }}
        className={`min-h-[44px] inline-flex items-center py-3  px-5  text-sm  rounded-3xl border ${
          user?._id !== message.from.id && "border-gray-200"
        }  ${user?._id === message.from.id && "bg-[#efefef]"} `}
      >
        {message.message}
      </p>
    </div>
  );
};

export default Message;
