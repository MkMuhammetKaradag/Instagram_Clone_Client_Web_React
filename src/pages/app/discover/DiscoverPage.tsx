import React, { useEffect, useState } from "react";

import { discoverPostType, getDiscoverPosts } from "../../../api";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Skeleton } from "@mui/material";
import DiscoverPostCard from "../../../componnets/discover/DiscoverPostCard";

export default function DiscoverPage() {
  const [posts, setPosts] = useState<discoverPostType[]>([]);
  const [isLoader, setIsLoader] = useState(true);
  const [skeleton, setSkeleton] = useState(true);

  useEffect(() => {
    getDiscoverPosts(1)
      .then((res) => {
        console.log("thenll");
        if (res.data.posts) {
          setPosts(res.data.posts);
          setIsLoader(res.data.posts.length % 10 === 0);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        console.log("finaly");
        setSkeleton(false);
      });
  }, []);
  const fetchData = () => {
    console.log("asa");
    if (posts.length % 10 === 0) {
      setSkeleton(true);
      getDiscoverPosts(Math.ceil(posts.length / 10 + 1))
        .then((res) => {
          if (res.data.posts) {
            setPosts((prev) => [...prev, ...res.data.posts]);
            setIsLoader(res.data.posts.length % 10 === 0);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setSkeleton(false);
        });
      // }, 1500);
    }
  };
  return (
    <div className="grid grid-rows-3 grid-flow-row-dense  grid-cols-3   gap-4">
      {posts.map((item, index) => (
        <div
          className={
            index % 10 == 0 || (index - 7) % 10 == 0
              ? "row-span-2 relative max-h-[720px]  w-[400px]  border"
              : "col-span-1 relative w-[400px]  max-h-[350px] border"
          }
          key={item._id}
        >
          <DiscoverPostCard post={item}></DiscoverPostCard>
        </div>
      ))}
      {isLoader && posts.length > 0 && (
        <div
          className="col-span-3 flex items-center justify-center"
          onClick={fetchData}
        >
          <AiOutlinePlusCircle size={24}></AiOutlinePlusCircle>
        </div>
      )}

      {skeleton &&
        Array.from(new Array(10)).map((_, index) => (
          <Skeleton
            className={
              index % 10 == 0 || (index - 7) % 10 == 0
                ? "row-span-2 min-h-[720px]  w-[400px]  border"
                : "col-span-1  w-[400px]  min-h-[350px] border"
            }
            key={index}
            variant="rectangular"
          />
        ))}
    </div>
  );
}
