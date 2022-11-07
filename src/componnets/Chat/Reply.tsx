import { TextField } from "@mui/material";

import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";

type ReplyPropsType = {
  setMessages: React.Dispatch<
    React.SetStateAction<
      {
        from: {
          id: string;
          name: string;
          username: string;
          avatar: string;
        };
        message: string;
      }[]
    >
  >;
};

const Reply = ({ setMessages }: ReplyPropsType) => {
  const [message, setmessage] = useState<string>("");
  const sendMessage = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(message);
    setMessages((messages) => [
      ...messages,
      {
        from: {
          id: "63578f6761e297c1a19c1b70",
          name: "muhammet",
          username: "deneme",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfm8UnQUb93iMa_J1a9GuKRJ1LWIzTD8dxrA&usqp=CAU",
        },
        message: message,
      },
    ]);
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
