import React from "react";
import { BsGrid3X3 } from "react-icons/bs";
const ProfilePost = () => {
  return (
    <div className="flex justify-center flex-col  items-center gap-4">
      <div className="w-[62px] h-[62px] border rounded-full border-black flex items-center justify-center ">
        <BsGrid3X3 size={30}></BsGrid3X3>
      </div>
      <h6 className="text-[28px] font-light">No Photos</h6>
    </div>
  );
};

export default ProfilePost;
