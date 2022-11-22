import React, { useState } from "react";
import {
  deleteFollowRequestUser,
  deleteUnFollowUser,
  getUserType,
  postFollowRequestUser,
  postFollowUser,
} from "../../api";
import { FiSettings } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  removeFollowUp,
  removeMyFollowRequest,
  setFollowUp,
  setMyFollowRequest,
} from "../../context/User/userSlice";

type profileHeaderProps = {
  user: getUserType | null;
};

const Header = ({ user }: profileHeaderProps) => {
  const myUser = useAppSelector((s) => s.auth.user);
  const followUps = useAppSelector((s) => s.user.followUps);
  const myFollowRequests = useAppSelector((s) => s.user.myFollowRequests);

  const dispatch = useAppDispatch();

  const [isFollow, setIsFollow] = useState(
    followUps.findIndex((s) => s == user?._id) > -1
  );
  console.log(
    "değer.",
    myFollowRequests.findIndex((s) => s == user?._id) > -1,
    myFollowRequests
  );

  const followUser = async () => {
    if (user) {
      postFollowUser(user._id)
        .then((res) => {
          if (res.data) {
            dispatch(setFollowUp(user._id));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const unFollowUser = async () => {
    if (user) {
      deleteUnFollowUser(user._id)
        .then((res) => {
          if (res.data) {
            dispatch(removeFollowUp(user._id));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const followRequestUser = () => {
    if (user) {
      postFollowRequestUser(user._id)
        .then((res) => {
          if (res.data) {
            dispatch(setMyFollowRequest(user._id));
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const removeFollowRequestUser = () => {
    if (user) {
      deleteFollowRequestUser(user._id)
        .then((res) => {
          if (res.data) {
            dispatch(removeMyFollowRequest(user._id));
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="justify-center flex">
      <header className="flex items-center w-[60%]  gap-x-2 py-4 pb-10 ">
        <img
          src={
            user?.userProfilePicture
              ? user.userProfilePicture
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQjblwVQ-GlXCaTJnkev2wwBkrWAZQzUehfQ&usqp=CAU"
          }
          className="w-[140px] h-[140px] rounded-full "
        ></img>
        <div className="ml-20">
          <div className="">
            <div className="flex  items-center  gap-x-3">
              <h1 className="text-[28px] font-light">{user?.userNickName}</h1>

              {myUser?.userNickName == user?.userNickName ? (
                <>
                  <button className="border shadow-sm p-1 rounded-md">
                    Profili Düzenle
                  </button>
                  <FiSettings size={24}></FiSettings>
                </>
              ) : followUps.findIndex((s) => s == user?._id) <= -1 ? (
                user?.profilePrivate ? (
                  myFollowRequests.findIndex((s) => s == user?._id) > -1 ? (
                    <button
                      onClick={() => removeFollowRequestUser()}
                      className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight  rounded shadow-md hover:bg-gray-200   active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Takip İsteği iptali
                    </button>
                  ) : (
                    <button
                      onClick={() => followRequestUser()}
                      className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight  rounded shadow-md hover:bg-gray-200   active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Takip İsteği
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => followUser()}
                    className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight  rounded shadow-md hover:bg-gray-200   active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Takipet
                  </button>
                )
              ) : (
                <button
                  onClick={() => unFollowUser()}
                  className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight  rounded shadow-md hover:bg-gray-200   active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Takipten çık
                </button>
              )}
            </div>

            <nav className="flex gap-x-6 items-center">
              <div>
                <span className="font-semibold">
                  {user?.userPosts?.length || 0}
                </span>{" "}
                posts
              </div>
              <div>
                <span className="font-semibold">{user?.followUps.length}</span>{" "}
                following
              </div>

              <div>
                <span className="font-semibold">{user?.followers.length}</span>{" "}
                followers
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
