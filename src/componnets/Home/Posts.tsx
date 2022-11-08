import React from "react";
import { PostType } from "../../api";
import PostsCard from "./PostCard";

type PostsProps = {
  posts: PostType[];
};

const Posts = ({ posts }: PostsProps) => {
  return (
    <div className="flex items-center justify-center flex-col gap-y-5">
      {posts.map((post) => (
        <PostsCard key={post._id} post={post}></PostsCard>
      ))}
    </div>
  );
};

export default Posts;
