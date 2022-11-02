import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Search = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-[268px] relative group">
      <span
        className={`absolute top-0 pointer-events-none left-0 h-9 w-9 text-[#8e8e8e] flex  items-center  justify-center
          ${open && "hidden"}`}
      >
        <GoSearch size={20}></GoSearch>
      </span>

      <input
        type="text"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        placeholder="Search"
        className="h-9 rounded w-full pl-9 bg-[#efefef] outline-none focus:pl-3"
      />
      <button
        onClick={() => setOpen(false)}
        className={`absolute top-0 right-0 h-9 w-9  focus:hidden hidden text-[#c7c7c7] items-center  justify-center ${
          open && "!flex"
        }`}
      >
        <AiFillCloseCircle size={16}></AiFillCloseCircle>
      </button>
    </div>
  );
};

export default Search;
