import React, { useState } from "react";
import { deletePostLike, postComment, PostType, putPostLike } from "../../api";
import { BsThreeDots, BsBookmark, BsEmojiSmile } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import ShowMoreText from "react-show-more-text";
import { Modal, TextField, Typography, Box } from "@mui/material";
import VideoCard from "./video/VideoCard";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeLike, setLike } from "../../context/User/userSlice";

type PostCardProps = {
  post: PostType;
};

const PostCard = ({ post }: PostCardProps) => {
  const [comment, setComment] = useState<string>("");
  const user = useAppSelector((s) => s.auth.user);
  const [postLikes, setPostLikes] = useState(post.likes);
  const [postComments, setPostComments] = useState(post.comments);

  const dispatch = useAppDispatch();
  const postLiked = () => {
    putPostLike(post._id)
      .then((res) => {
        if (user) {
          setPostLikes((s) => [...s, user._id]);
          console.log("postLİke", postLikes);
          dispatch(setLike(post._id));
        }
      })
      .catch((err) => console.log(err));
  };
  const postRemoveLiked = () => {
    deletePostLike(post._id)
      .then((res) => {
        if (user) {
          setPostLikes((s) => {
            return s.filter((id) => id != user._id);
          });
          console.log("removelike:", postLikes);
          dispatch(removeLike(post._id));
        }
      })
      .catch((err) => console.log(err));
  };

  const addComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.length > 0) {
      postComment(post._id, { description: comment })
        .then((res) => {
          if (res.data.comments) {
            setPostComments(res.data.comments);
            setComment("");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const navigate = useNavigate();
  const likes = useAppSelector((s) => s.user.likes);
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    navigate(`/`);
    setModalOpen(false);
  };

  return (
    <div className="border bg-white border-gray-400 rounded-md mt-4 w-[480px] ">
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
          <VideoCard
            video_url={post.video_url ? post.video_url : ""}
            post_id={post._id}
          ></VideoCard>
        )}
      </div>
      <div className="px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-start gap-x-2">
            <AiOutlineHeart
              className="cursor-pointer"
              size={26}
              onClick={() =>
                likes.includes(post._id) ? postRemoveLiked() : postLiked()
              }
              color={likes.includes(post._id) ? "red" : "black"}
            ></AiOutlineHeart>
            <FaRegComment
              className="cursor-pointer hover:text-gray-600 "
              onClick={() => {
                handleModalOpen();
                navigate(`/${post._id}`);
              }}
              size={26}
            ></FaRegComment>
            <FiSend size={26}></FiSend>
          </div>
          <BsBookmark size={26}></BsBookmark>
        </div>
        <div>
          <span className=" font-semibold">{postLikes.length} beğenme</span>
        </div>

        <div className="w-full">
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
          {postComments.length > 0 ? (
            <span className="text-gray-400">
              {postComments.length} yorumun tümünü gör{" "}
            </span>
          ) : (
            <p className="text-gray-300"> not comment</p>
          )}
        </div>
      </div>
      <div className="border-b mt-2 border-gray-300"></div>
      <div className="flex">
        <form
          onSubmit={(e) => addComment(e)}
          className="min-h-[44px]  max-h-[108px]   flex  items-center  w-full px-2"
        >
          <button className="w-[40px] h-[42px] flex items-center  justify-center">
            <BsEmojiSmile size={24}></BsEmojiSmile>
          </button>

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
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            bgcolor: "background.paper",
            border: "1px  #000",
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          <Outlet
            context={{
              postPage: {
                postUrl: post.image_url
                  ? post.image_url
                  : post.video_url
                  ? post.video_url
                  : "",
                _id: post._id,
                postType: post.type,
                postOwner: post.owner,
              },
            }}
          ></Outlet>
        </Box>
      </Modal>
    </div>
  );
};

export default PostCard;
