import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getMyFollowUpsPosts, PostType } from "../../api";
import Posts from "../../componnets/Home/Posts";
import ReactPlayer from "react-player";

const HomePage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    getMyFollowUpsPosts()
      .then((res) => {
        if (res.data.myFollowUpsPosts) {
          console.log("sa");
          setPosts(res.data.myFollowUpsPosts);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {/* <Helmet>
        <title>Instagram</title>
      </Helmet> */}
      {posts.length > 0 && <Posts setPosts={setPosts} posts={posts}></Posts>}
      {/* <div>
        <ReactPlayer
          width={"100%"}
          controls={true}
          url={
            "https://muhammetinstagramclone.s3.amazonaws.com/posts/63578f6e61e297c1a19c1b72/videos/a5Y7_i6mUL.mp4"
          }
        />
        
      </div>
      sa vchat */}
    </div>
  );
};

export default HomePage;
