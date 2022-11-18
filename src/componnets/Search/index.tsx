import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { AiFillCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Modal, Popover, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getSearchUsers, PostUserType } from "../../api";
import { Link } from "react-router-dom";

const Search = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchUsers, setSearchUsers] = useState<PostUserType[]>([]);
  const [lastSearch, setLastSearch] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [isLoader, setIsLoader] = useState(true);

  const fetchData = async () => {
    if (searchUsers.length % 5 === 0) {
      getSearchUsers(searchText, Math.ceil(searchUsers.length / 5 + 1))
        .then((res) => {
          setSearchUsers((prev) => [...prev, ...res.data.users]);
          setIsLoader(res.data.users.length % 5 === 0);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          onKeyDown={(e) => {
            if (e.key == "Enter" && lastSearch != searchText) {
              console.log(searchText);
              setShowModal(true);
              fetchData();
              setLastSearch(searchText);
            }
          }}
          className="h-9 rounded w-full pl-9 bg-[#efefef] outline-none focus:pl-3"
        />
        <button
          onClick={() => {
            console.log("kapat");
            setSearchText("asa");
          }}
          className={`absolute top-0 right-0 h-9 w-9   hidden text-[#c7c7c7] items-center  justify-center ${
            open && "!flex"
          }`}
        >
          <AiFillCloseCircle size={24}></AiFillCloseCircle>
        </button>
      </div>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[400px] max-h-[700px] customScrol overflow-auto bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-end  flex-col p-2 border-b border-solid border-slate-200 rounded-t">
                  close
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {searchUsers.map((user, index) => (
                    <Link
                      to={`/user/${user.userNickName}/posts`}
                      onClick={() => {
                        setShowModal(false);
                        setSearchText("");
                        setLastSearch("");
                        setSearchUsers([]);
                      }}
                    >
                      <div className="w-full flex gap-x-2 my-2 py-2  rounded-xl hover:bg-gray-100">
                        <img
                          className="w-8 h-8 rounded-full  "
                          src={
                            user.userProfilePicture
                              ? user.userProfilePicture
                              : ""
                          }
                        ></img>
                        <h3>{user.userNickName}</h3>
                      </div>
                    </Link>
                  ))}
                  {isLoader && searchUsers.length > 0 && (
                    <div
                      className=" m-auto mb-2 flex items-center justify-center  cursor-pointer"
                      onClick={fetchData}
                    >
                      <AiOutlinePlusCircle size={24}></AiOutlinePlusCircle>
                    </div>
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setSearchText("");
                      setLastSearch("");

                      setSearchUsers([]);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
};

export default Search;
