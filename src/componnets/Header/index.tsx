import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getLogout } from "../../api";
import InstagramTextLogo from "../../assest/InstagramTextLogo2.png";
import Search from "../Search";
import toast from "react-hot-toast";
import { setUser } from "../../context/Auth/authSlice";
import { SlHome } from "react-icons/sl";
import { RiMessengerLine, RiMessengerFill } from "react-icons/ri";
import { FiPlusSquare } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlineHeart, AiFillHome, AiOutlineHome } from "react-icons/ai";
import { useAppSelector } from "../../app/hooks";
// import { Avatar, IconButton, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { WebSocketContext } from "../../context/WebSocketContext";
import CreatedPost from "./CreatedPost";
import { Avatar, IconButton, Tooltip } from "@mui/material";
const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const socket = useContext(WebSocketContext);

  const logout = async () => {
    socket.disconnect();
    getLogout()
      .then((user) => {
        console.log(user);
        dispatch(setUser(user.data.user));
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <header className=" bg-white border-b border-gray-300 ">
      <div className="flex items-center justify-between container mx-auto h-[60px]">
        <Link to={"/"}>
          <img className="h-[29px]" src={InstagramTextLogo} alt="" />
        </Link>
        <Search></Search>
        <nav className="flex items-center gap-x-6">
          <NavLink to={"/"}>
            {({ isActive }) =>
              isActive ? (
                <AiFillHome size={25}></AiFillHome>
              ) : (
                <AiOutlineHome size={28}></AiOutlineHome>
              )
            }
          </NavLink>
          <NavLink to={"/inbox"}>
            {({ isActive }) =>
              isActive ? (
                <RiMessengerFill size={28}></RiMessengerFill>
              ) : (
                <RiMessengerLine size={28}></RiMessengerLine>
              )
            }
          </NavLink>

          <FiPlusSquare
            className="cursor-pointer"
            onClick={handleModalOpen}
            size={28}
          ></FiPlusSquare>

          <NavLink to={"/"}>
            <MdOutlineExplore size={28}></MdOutlineExplore>
          </NavLink>
          <NavLink to={"/"}>
            <AiOutlineHeart size={28}></AiOutlineHeart>
          </NavLink>

          {/* <NavLink to={`/user/${user?.userNickName}/posts`}>
            <AiOutlineHeart size={28}></AiOutlineHeart>
          </NavLink> */}
          {/* <button onClick={logout}>
            <img
              className="w-[25px] h-[25px] rounded-md"
              src={
                user?.userProfilePicture ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQjblwVQ-GlXCaTJnkev2wwBkrWAZQzUehfQ&usqp=CAU"
              }
              alt=""
            />
          </button> */}

          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <NavLink to={`/user/${user?.userNickName}/posts`}>
              <MenuItem>
                <Avatar
                  src={
                    user?.userProfilePicture ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQjblwVQ-GlXCaTJnkev2wwBkrWAZQzUehfQ&usqp=CAU"
                  }
                />
                Profile
              </MenuItem>
            </NavLink>
            <MenuItem>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </nav>

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
              width: 700,
              height: 700,
              bgcolor: "background.paper",
              border: "1px  #000",
              boxShadow: 24,
              borderRadius: 2,
            }}
          >
            <CreatedPost></CreatedPost>
          </Box>
        </Modal>
      </div>
    </header>
  );
};

export default Header;
