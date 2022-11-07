import React from "react";
import { FiSend } from "react-icons/fi";
import Button from "../../../componnets/Auth/Button";
const Inbox = () => {
  return (
    <div className="h-full flex  items-center gap-y-4 justify-center flex-col">
      <div className="w-[100px] h-[100px] border-2 border-black items-center justify-center flex rounded-full">
        <FiSend size={60}></FiSend>
      </div>
      <h2 className="text-[22px] font-light">Your Messages</h2>
      <p className="text-sm  text-[#8e8e8e]">
        Sen private photo and Messages to a friend or grouup
      </p>
      <div>
        <Button>Send Message</Button>
      </div>
    </div>
  );
};

export default Inbox;
