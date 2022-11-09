import React from "react";
import { getUserType } from "../../api";
import { FiSettings } from "react-icons/fi";
import { useAppSelector } from "../../app/hooks";

type profileHeaderProps = {
  user: getUserType | null;
};

const Header = ({ user }: profileHeaderProps) => {
  const myUser = useAppSelector((s) => s.auth.user);
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
              {myUser?.userNickName == user?.userNickName && (
                <>
                  <button className="border shadow-sm p-1 rounded-md">
                    Profili Düzenle
                  </button>
                  <FiSettings size={24}></FiSettings>
                </>
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
                <span className="font-semibold">
                  {typeof user?.followUps == "number"
                    ? user?.followUps
                    : user?.followUps.length}
                </span>{" "}
                following
              </div>

              <div>
                <span className="font-semibold">
                  {typeof user?.followers == "number"
                    ? user?.followers
                    : user?.followers.length}
                </span>{" "}
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
