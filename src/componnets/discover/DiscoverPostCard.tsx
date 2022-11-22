import React from "react";
import { discoverPostType } from "../../api";
import { Modal, TextField, Typography, Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
type ProfilePostCardProps = {
  post: discoverPostType;
};
const DiscoverPostCard = ({ post }: ProfilePostCardProps) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    navigate(`/explore`);
    setModalOpen(false);
  };
  console.log(post.owner);
  return (
    <>
      {post.type == "IMAGE" ? (
        <img
          className="object-fill w-full h-full"
          src={post.image_url ? post.image_url : ""}
          alt={post.description}
        />
      ) : (
        <div className="relative w-full h-full object-fill">
          <video
            style={{
              contain: "",
            }}
            className="w-full h-full object-fill"
            src={post.video_url ? post.video_url : ""}
          ></video>
          <div className="absolute top-0 right-0 text-red-900 font-semibold bg-white">
            video
          </div>
        </div>
      )}
      <div
        onClick={() => {
          handleModalOpen();
          navigate(`/explore/${post._id}`);
        }}
        className="absolute flex-col items-center fd-sh top-0 right-0 bottom-0 left-0 w-full h-full justify-center posts-center flex overflow-hidden opacity-0 hover:opacity-100 transition duration-300 ease-in-out bg-zinc-500  bg-opacity-50"
      >
        <span className="text-3xl font-bold text-white tracking-wider leading-relaxed font-sans">
          likes:{post.likes.length}
        </span>
        <span className="text-3xl font-bold text-white tracking-wider leading-relaxed font-sans">
          comments:{post.comments.length}
        </span>
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
                postOwner: post.owner[0],
              },
            }}
          ></Outlet>
        </Box>
      </Modal>
    </>
  );
};

export default DiscoverPostCard;
