import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useOutletContext } from "react-router-dom";
import {
  getCommentsFromPost,
  postCommentType,
  PostType_2,
  PostUserType,
} from "../../../api";
type outletContextType = {
  userPosts?: PostType_2[];
  postPage?: {
    _id: string;
    postUrl: string;
    postType: string;
    postOwner: PostUserType;
  };
};
const PostPage = () => {
  const { postPage } = useOutletContext<outletContextType>();
  const [comments, setComments] = useState<postCommentType[]>([]);
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    if (postPage) {
      getCommentsFromPost(postPage._id, 1)
        .then((res) => {
          setComments(res.data.comments);
          setIsLoader(res.data.comments.length % 10 === 0);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const fetchData = () => {
    console.log("asa");
    if (comments.length % 10 === 0 && postPage) {
      // console.log(Math.ceil(comments.length / 10 + 1));
      getCommentsFromPost(postPage._id, Math.ceil(comments.length / 10 + 1))
        .then((res) => {
          setComments((prev) => [...prev, ...res.data.comments]);
          setIsLoader(res.data.comments.length % 10 === 0);
        })
        .catch((err) => console.log(err));
      // }, 1500);
    }
  };

  return (
    <div className="w-full h-full flex">
      <div className="max-w-[900px]  min-w-[200px] max-h-[900px] min-h-[800px] flex  items-center justify-center bg-red-300 h-full">
        {postPage && postPage.postType == "IMAGE" && (
          <img
            className="max-w-[900px] max-h-[800px] min-h-[500px] "
            src={postPage.postUrl}
          ></img>
        )}
        {postPage && postPage.postType == "VIDEO" && (
          <div className="relative">
            <video
              // style={{
              //   contain: "size",
              // }}
              className="w-full max-h-[900px] min-h-[800px]"
              src={postPage.postUrl}
            ></video>
            <div className="absolute top-0 right-0 text-red-900 font-semibold bg-white">
              video
            </div>
          </div>
        )}
      </div>
      <div className="w-[500px] max-h-[900px] bg-slate-400  ">
        <div className="w-full border-b border-gray-300 p-2 gap-x-2 flex">
          <div>
            <img
              src={postPage?.postOwner.userProfilePicture || ""}
              className="w-9 h-9 rounded-full"
            />
          </div>
          <div className="items-center flex">
            <span className="font-semibold">
              {postPage?.postOwner.userNickName}
            </span>
          </div>
        </div>
        {/* <InfiniteScroll
          dataLength={comments.length}
          next={fetchData}
          hasMore={true}
          loader={(comments.length / 10) % 1 === 0 ? <h4>Loading...</h4> : null}
          scrollableTarget="scrollableDiv"
        > */}
        <div
          className=" max-h-[600px] overflow-x-auto customScrol"
          // style={{
          //   "&::WebkitScrollbar": { width: 0, height: 0 },
          // }}
        >
          {comments.map((comment) => (
            <div
              className="w-full h-[80px] items-center flex p-3 gap-x-2"
              key={comment._id}
            >
              <div>
                <img
                  src={comment.user.userProfilePicture || ""}
                  className="w-9 h-9 rounded-full"
                />
              </div>
              <div className="flex items-center gap-x-1">
                <span className="font-semibold">
                  {comment.user.userNickName}
                </span>
                <p> {comment.description}</p>
              </div>
            </div>
          ))}
          {isLoader && (
            <div className="w-full cursor-pointer" onClick={fetchData}>
              loader
            </div>
          )}
        </div>
        <div className="w-full bg-black text-white max-h-[200px]">sa</div>
        {/* </InfiniteScroll> */}
      </div>
    </div>
  );
};

export default PostPage;
