import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getLogout } from "../../api";
import InstagramTextLogo from "../../assest/InstagramTextLogo2.png";
import Search from "../Search";
import toast from "react-hot-toast";
import { setUser } from "../../context/Auth/authSlice";
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
        <nav>
          <button onClick={logout}>LogOut</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
