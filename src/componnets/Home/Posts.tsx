import React from "react";
import { getMyFollowUpsPosts, PostType } from "../../api";
import PostsCard from "./PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
type PostsProps = {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};

const Posts = ({ posts, setPosts }: PostsProps) => {
  const fetchData = () => {
    if ((posts.length / 5 + 1) % 1 === 0) {
      // setTimeout(() => {
      getMyFollowUpsPosts(Math.ceil(posts.length / 5 + 1))
        .then((res) => {
          if (res.data.myFollowUpsPosts) {
            console.log(res.data.myFollowUpsPosts);
            setPosts((prev) => [...prev, ...res.data.myFollowUpsPosts]);
          }
        })
        .catch((err) => console.log(err));
      // }, 1500);
    }
  };
  return (
    <div className="flex items-center justify-center flex-col gap-y-5">
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchData}
        hasMore={true}
        loader={(posts.length / 5 + 1) % 1 === 0 ? <h4>Loading...</h4> : null}
        scrollableTarget="scrollableDiv"
      >
        {posts.map((post) => (
          <PostsCard key={post._id} post={post}></PostsCard>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Posts;
