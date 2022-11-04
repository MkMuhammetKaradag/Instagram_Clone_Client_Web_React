import React from "react";
import { MdOutlinePersonPin } from "react-icons/md";

const ProfileTagged = () => {
  return (
    <div className="flex justify-center flex-col  items-center gap-4">
      <div className="w-[62px] h-[62px] border rounded-full border-black flex items-center justify-center ">
        <MdOutlinePersonPin size={30}></MdOutlinePersonPin>
      </div>
      <h6 className="text-[28px] font-light">No Photos</h6>
    </div>
  );
};

export default ProfileTagged;
