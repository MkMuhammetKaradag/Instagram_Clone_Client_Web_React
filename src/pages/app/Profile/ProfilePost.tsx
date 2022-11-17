import React from "react";
import { BsGrid3X3 } from "react-icons/bs";
import { useOutletContext } from "react-router-dom";
import { PostType_2, PostUserType } from "../../../api";
import VideoCard from "../../../componnets/Home/video/VideoCard";
import ProfilePostCard from "../../../componnets/Profile/ProfilePostCard";
type outletContextType = {
  userProfiePage?: {
    userPosts: PostType_2[];
    userInfo: PostUserType;
  };
};

const ProfilePost = () => {
  const { userProfiePage } = useOutletContext<outletContextType>();
  return (
    <div>
      {userProfiePage && userProfiePage.userPosts.length > 0 ? (
        <div>
          <section className=" text-gray-700 ">
            <div className="container">
              <div className="flex flex-wrap ">
                {userProfiePage.userPosts.map((post) => (
                  <ProfilePostCard
                    post={post}
                    userInfo={userProfiePage.userInfo}
                  ></ProfilePostCard>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex justify-center flex-col  items-center gap-4">
          <div className="w-[62px] h-[62px] border rounded-full border-black flex items-center justify-center ">
            <BsGrid3X3 size={30}></BsGrid3X3>
          </div>
          <h6 className="text-[28px] font-light">No Photos</h6>
        </div>
      )}
    </div>
  );
};

export default ProfilePost;
