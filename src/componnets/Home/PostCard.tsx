import React, { useState } from "react";
import { PostType } from "../../api";
import { BsThreeDots, BsBookmark, BsEmojiSmile } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import ShowMoreText from "react-show-more-text";
import { TextField } from "@mui/material";
import VideoCard from "./video/VideoCard";
import { Link } from "react-router-dom";

type PostCardProps = {
  post: PostType;
};

const PostCard = ({ post }: PostCardProps) => {
  const [comment, setComment] = useState<string>("");
  // console.log(post.video_url);
  return (
    <div className="border bg-white border-gray-400 rounded-md w-[480px] ">
      <div className="flex items-center justify-between p-4">
        <div className="flex  items-center">
          <Link
            className="flex items-center"
            to={`/user/${post.owner.userNickName}/posts`}
          >
            <img
              className="w-[35px] h-[35px] rounded-full"
              src={
                post.owner.userProfilePicture
                  ? post.owner.userProfilePicture
                  : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
              }
              alt="post_user_ image"
            />
            <span className="ml-2 font-semibold">
              {post.owner.userNickName}
            </span>
          </Link>
        </div>

        <BsThreeDots size={24}></BsThreeDots>
      </div>
      <div className="max-h-[550px] min-h-[350px] w-full">
        {post.type === "IMAGE" && (
          <img
            className="max-h-[500px] min-h-[350px] w-full"
            src={post.image_url ? post.image_url : " "}
            alt=""
          />
        )}
        {post.type === "VIDEO" && (
          // <ReactPlayer
          //   controls={true}
          //   url={
          //     "https://muhammetinstagramclone.s3.amazonaws.com/posts/63578f6e61e297c1a19c1b72/videos/a5Y7_i6mUL.mp4"
          //   }
          // />
          // <video
          //   controls={false}
          //   autoPlay={false}
          //   onClick={() => console.log("PLAY")}
          //   loop
          //   muted
          //   className="max-h-[550px] w-full"
          // >
          //   <source
          //     src={post.video_url ? post.video_url : ""}
          //     type="video/mp4"
          //   ></source>
          // </video>
          <VideoCard
            video_url={post.video_url ? post.video_url : ""}
            post_id={post._id}
          ></VideoCard>
          // <p>{post.video_url}</p>
        )}
      </div>
      <div className="px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-start gap-x-2">
            <AiOutlineHeart size={26}></AiOutlineHeart>
            <FaRegComment size={26}></FaRegComment>
            <FiSend size={26}></FiSend>
          </div>
          <BsBookmark size={26}></BsBookmark>
        </div>
        <div>
          <span className=" font-semibold">{post.likes.length} beğenme</span>
        </div>

        <div className="w-full">
          {/* <span className="font-semibold">{post.owner.userNickName}.. </span>
          {post.description}
          asasa saasas asasasa asasasaasa asfdfdf dfdfdf dfdfdfdfd dfdfdfdfddfd
          dfdfd */}

          <ShowMoreText
            /* Default options */
            lines={3}
            more="..."
            less="Show less"
            className="content-css"
            anchorClass="show-more-less-clickable"
            onClick={() => console.log("nice")}
            expanded={false}
            width={280}
            truncatedEndingComponent={" "}
          >
            <p className="overflow-hidden">{post.description}</p>
          </ShowMoreText>
        </div>
        <div>
          {post.comments.length > 0 ? (
            <span className="text-gray-400">
              {post.comments.length} yorumun tümünü gör{" "}
            </span>
          ) : (
            <p className="text-gray-300"> not comment</p>
          )}
        </div>
      </div>
      <div className="border-b mt-2 border-gray-300"></div>
      <div className="flex">
        <form
          onSubmit={() => console.log("geldi")}
          className="min-h-[44px]  max-h-[108px]   flex  items-center  w-full px-2"
        >
          <button className="w-[40px] h-[42px] flex items-center  justify-center">
            <BsEmojiSmile size={24}></BsEmojiSmile>
          </button>
          {/* <input

          placeholder="Message..."
          onChange={(e) => setmessage(e.target.value)}
        ></input> */}

          {/* <TextField
          id="outlined-multiline-static"
          className="flex-1 outline-none h-[40px] px-2 placeholder:text-gray-600 text-sm  focus:placeholder:text-gray-300"
          multiline
          rows={4}
        /> */}
          <TextField
            id="outlined-multiline-flexible"
            className="flex-1 outline-none  px-2 placeholder:text-gray-600 text-sm  focus:placeholder:text-gray-300"
            multiline
            maxRows={4}
            placeholder="Messages..!!!"
            value={comment}
            variant="standard"
            onChange={(e) => setComment(e.target.value)}
          />
          {comment ? (
            <button className="text-brand font-semibold text-sm  px-3">
              Send
            </button>
          ) : (
            <button className="w-[40px] h-[42px] flex items-center  justify-center">
              <BsEmojiSmile size={24}></BsEmojiSmile>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostCard;
