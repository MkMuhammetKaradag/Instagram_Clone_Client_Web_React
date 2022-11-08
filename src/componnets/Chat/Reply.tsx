import { TextField } from "@mui/material";

import React, { useContext, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { ChatMessage } from "../../api";
import { useAppSelector } from "../../app/hooks";
import { WebSocketContext } from "../../context/WebSocketContext";

type ReplyPropsType = {
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
};

const Reply = ({ setMessages }: ReplyPropsType) => {
  const [message, setmessage] = useState<string>("");
  const user = useAppSelector((s) => s.auth.user);
  const { chatId } = useParams();
  const socket = useContext(WebSocketContext);
  const sendMessage = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // console.log(message);
    if (message) {
      setMessages((messages) => [...messages]);
      socket.emit("newMessage", {
        createdMessage: {
          from: user?._id,
          MessageText: message,
        },
        ChatId: chatId,
      });
    }

    setmessage("");
  };
  return (
    <footer className="min-h-[84px] max-h-[148px] flex items-center  justify-center px-6 ">
      <form
        onSubmit={sendMessage}
        className="min-h-[44px]  max-h-[108px] border rounded-2xl flex  items-center  w-full px-2"
      >
        <button className="w-[40px] h-[42px] flex items-center  justify-center">
          <BsEmojiSmile size={24}></BsEmojiSmile>
        </button>
        {/* <input
          
          placeholder="Message..."
          onChange={(e) => setmessage(e.target.value)}
        ></input> */}

        {/* <TextField
          id="outlined-multiline-static"
          className="flex-1 outline-none h-[40px] px-2 placeholder:text-gray-600 text-sm  focus:placeholder:text-gray-300"
          multiline
          rows={4}
        /> */}
        <TextField
          id="outlined-multiline-flexible"
          className="flex-1 outline-none  px-2 placeholder:text-gray-600 text-sm  focus:placeholder:text-gray-300"
          multiline
          maxRows={4}
          placeholder="Messages..!!!"
          value={message}
          variant="standard"
          onChange={(e) => setmessage(e.target.value)}
        />
        {message ? (
          <button className="text-brand font-semibold text-sm  px-3">
            Send
          </button>
        ) : (
          <button className="w-[40px] h-[42px] flex items-center  justify-center">
            <BsEmojiSmile size={24}></BsEmojiSmile>
          </button>
        )}
      </form>
    </footer>
  );
};

export default Reply;
