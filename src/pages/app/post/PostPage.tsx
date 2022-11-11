import React from "react";
import { useOutletContext } from "react-router-dom";
import { PostType_2 } from "../../../api";
type outletContextType = {
  userPosts?: PostType_2[];
  postPage?: {
    postImage: string;
  };
};
const PostPage = () => {
  const { postPage } = useOutletContext<outletContextType>();
  return (
    <div className="w-full h-full">
      <div className="w-[80%] h-full">
        {postPage && (
          <img className="w-[200px] h-[200px]" src={postPage.postImage}></img>
        )}
      </div>
    </div>
  );
};

export default PostPage;
