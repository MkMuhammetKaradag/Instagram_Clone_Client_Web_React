import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
const user = {
  name: "Muhammet",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMT3-A3BoHLW3BEGarYVhSG3ha0VvGsLbHIw&usqp=CAU",
};
const Header = () => {
  return (
    <header className="h-[70px] border-b  border-gray-300 flex justify-between items-center  px-6">
      <button className="flex items-center pag-x-4">
        <img src={user.avatar} className="w-6 h-6  rounded-ful" alt="" />
        <h6>{user.name}</h6>
      </button>
      <button>
        <AiOutlineInfoCircle></AiOutlineInfoCircle>
      </button>
    </header>
  );
};

export default Header;
