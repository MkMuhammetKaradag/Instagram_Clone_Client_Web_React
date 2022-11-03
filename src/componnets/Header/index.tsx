import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getLogout } from "../../api";
import InstagramTextLogo from "../../assest/InstagramTextLogo2.png";
import Search from "../Search";
import toast from "react-hot-toast";
import { setUser } from "../../context/Auth/authSlice";
import { SlHome } from "react-icons/sl";
import { RiMessengerLine } from "react-icons/ri";
import { FiPlusSquare } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
const Header = () => {
  const dispatch = useDispatch();
  const logout = async () => {
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
            <SlHome size={25}></SlHome>
          </NavLink>
          <NavLink to={"/"}>
            <RiMessengerLine size={28}></RiMessengerLine>
          </NavLink>
          <NavLink to={"/"}>
            <FiPlusSquare size={28}></FiPlusSquare>
          </NavLink>
          <NavLink to={"/"}>
            <MdOutlineExplore size={28}></MdOutlineExplore>
          </NavLink>
          <NavLink to={"/"}>
            <AiOutlineHeart size={28}></AiOutlineHeart>
          </NavLink>
          <button onClick={logout}>
            <img
              className="w-[25px] h-[25px] rounded-md"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQjblwVQ-GlXCaTJnkev2wwBkrWAZQzUehfQ&usqp=CAU"
              alt=""
            />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
