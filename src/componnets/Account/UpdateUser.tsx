import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FiPlusSquare } from "react-icons/fi";
import CreatedPost from "../Header/CreatedPost";
import UpdateUserPicture from "./UpdateUserPicture";
const UpdateUser = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  return (
    <div className="rounded-sm">
      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
        <span className="text-green-500">
          <svg
            className="h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </span>
        <span className="tracking-wide">About</span>
      </div>
      <div className="flex gap-x-2 items-center">
        <span className="tracking-wide">Profile Picture</span>
        <FiPlusSquare
          className="cursor-pointer"
          onClick={handleModalOpen}
          size={24}
        ></FiPlusSquare>
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
          <UpdateUserPicture
            userImage={""}
            userNickName={""}
          ></UpdateUserPicture>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateUser;
