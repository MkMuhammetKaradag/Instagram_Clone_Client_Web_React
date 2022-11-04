import React from "react";
import { getUserType } from "../../api";
type profileHeaderProps = {
  user: getUserType | null;
};
const Header = ({ user }: profileHeaderProps) => {
  return (
    <div>
      <header className="flex items-center  gap-x-6 py-4 pb-10">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDJaEoQJ0PLbNOn_xHRIw7mcyuIOj0_hVZlA&usqp=CAU"
          className="w-[150px]  rounded-full "
        ></img>

        <div>
          <h1 className="text-[28px] font-light">{user?.userNickName}</h1>
          <nav className="flex gap-x-6 items-center">
            <div>
              <span className="font-semibold">
                {user?.userPosts?.length || 0}{" "}
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
      </header>
    </div>
  );
};

export default Header;
