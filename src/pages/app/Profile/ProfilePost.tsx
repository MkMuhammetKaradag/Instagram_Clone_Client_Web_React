import React from "react";
import { BsGrid3X3 } from "react-icons/bs";
import { useOutletContext } from "react-router-dom";
import { PostType_2 } from "../../../api";
import VideoCard from "../../../componnets/Home/video/VideoCard";
type outletContextType = {
  userPosts?: PostType_2[];
  postPage?: {
    postImage: string;
  };
};

const ProfilePost = () => {
  const { userPosts } = useOutletContext<outletContextType>();
  return (
    <div>
      {userPosts && userPosts.length > 0 ? (
        <div>
          <section className=" text-gray-700 ">
            <div className="container">
              <div className="flex flex-wrap ">
                {userPosts.map((post) => (
                  <div
                    className="flex flex-wrap h-[320px] w-1/3  mt-2  "
                    key={post._id}
                  >
                    <div className="relative w-full h-full  md:m-2">
                      {post.type == "IMAGE" ? (
                        <>
                          <img
                            alt="gallery"
                            className=" w-full h-full "
                            src={post.image_url ? post.image_url : ""}
                          />
                        </>
                      ) : (
                        // <VideoCard
                        //   post_id={post._id}
                        //   video_url={post.video_url ? post.video_url : ""}
                        // ></VideoCard>
                        <>
                          <div className="relative">
                            <video
                              className="h-[320px] w-full"
                              style={{
                                contain: "size",
                              }}
                              src={post.video_url ? post.video_url : ""}
                            ></video>
                            <div className="absolute top-0 right-0 text-red-900 font-semibold bg-white">
                              video
                            </div>
                          </div>

                          <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-50 transition duration-300 ease-in-out bg-zinc-500"></div>
                        </>

                        // <div>Bakılacak</div>
                      )}
                      <div className="absolute  fd-sh top-0 right-0 bottom-0 left-0 w-full h-full justify-center items-center flex overflow-hidden opacity-0 hover:opacity-100 transition duration-300 ease-in-out bg-zinc-500  bg-opacity-50">
                        <span className="text-3xl font-bold text-white tracking-wider leading-relaxed font-sans">
                          likes:{post.likes.length}
                        </span>
                      </div>
                    </div>
                  </div>
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
