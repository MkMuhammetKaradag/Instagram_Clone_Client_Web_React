import React from "react";
import { PostType_2, PostUserType } from "../../api";
import { Modal, TextField, Typography, Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
type ProfilePostCardProps = {
  post: PostType_2;
  userInfo: PostUserType;
};
const ProfilePostCard = ({ post, userInfo }: ProfilePostCardProps) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    navigate(`/user/${userInfo.userNickName}/posts`);
    setModalOpen(false);
  };

  return (
    <div className="flex flex-wrap h-[320px] w-1/3  mt-2  " key={post._id}>
      <div
        className="relative w-full h-full   md:m-2"
        onClick={() => {
          handleModalOpen();
          navigate(`/user/${userInfo.userNickName}/posts/${post._id}`);
        }}
      >
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
        <div className="absolute flex-col  fd-sh top-0 right-0 bottom-0 left-0 w-full h-full justify-center items-center flex overflow-hidden opacity-0 hover:opacity-100 transition duration-300 ease-in-out bg-zinc-500  bg-opacity-50">
          <span className="text-3xl font-bold text-white tracking-wider leading-relaxed font-sans">
            likes:{post.likes.length}
          </span>
          <span className="text-3xl font-bold text-white tracking-wider leading-relaxed font-sans">
            comments:{post.comments.length}
          </span>
        </div>
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
                postOwner: userInfo,
              },
            }}
          ></Outlet>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfilePostCard;
