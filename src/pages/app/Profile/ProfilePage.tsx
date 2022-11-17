import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { getUser, getUserType } from "../../../api";
import toast from "react-hot-toast";
import Header from "../../../componnets/Profile/Header";
import { BsGrid3X3 } from "react-icons/bs";
import { MdOutlinePersonPin } from "react-icons/md";
import { makeStyles, Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet";
import ProfileNotFound from "../../../componnets/Profile/NotFound";
const ProfilePage = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<getUserType | null>(null);
  useEffect(() => {
    /*
      Query logic
    */
    // console.log("kaçkere");
    // const fetchData = async () => {
    //   const response = await getUser(userName);
    //   if (response?.data.user) {
    //     // console.log(res.data.user);
    //     setUser(response.data.user);

    //     setLoading(false);
    //   }
    // };
    // fetchData();

    getUser(userName)
      .then((res) => {
        if (res?.data.user) {
          console.log(res.data.user);
          setUser(res.data.user);

          setLoading(false);
        }
      })
      .catch((err) => {
        // console.log("neden ikikere");
        // navigate("/", {
        //   replace: true,
        // });
        setLoading(false);
        toast.error("kullanıcı nulunamadı");
      });
  }, [userName]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(newValue);
    newValue == 1
      ? navigate(`/user/${user?.userNickName}/tagged`)
      : navigate(`/user/${user?.userNickName}/posts`);
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return user ? (
    <div>
      {/* <Helmet>
        <title>(@{user.userNickName}) * Instagram Photos and Videos</title>
      </Helmet> */}
      <Header user={user}></Header>
      <nav className="border-t">
        {/* <NavLink to={`/user/${user?.userNickName}`}>
          <BsGrid3X3 size={12}></BsGrid3X3>
          POSTS
        </NavLink>
        <NavLink to={"/"}>
          <MdOutlinePersonPin size={12}></MdOutlinePersonPin>
          TAGGED
        </NavLink> */}
        <div className="flex items-center justify-center">
          <Tabs
            value={value}
            onChange={handleChange}
            orientation="horizontal"
            aria-label="icon position tabs example"
            TabIndicatorProps={{
              sx: {
                top: 0,
                backgroundColor: "gray",
              },
            }}
            sx={{
              marginTop: "-1px",
              // backgroundColor: "purple",
              // "& button:hover": { backgroundColor: "gray" },
              "& button:active": { color: "green" },
              "& button:focus": { color: "gray" },
              "& .MuiTab-root.Mui-selected": {
                color: "black",
              },
              "& .MuiTab-root": {
                color: "#8e8e8e",
              },
              // "& .MuiTab-root.Mui-disabled": {
              //   color: "",
              // },
            }}
          >
            <Tab
              icon={<BsGrid3X3 size={12}></BsGrid3X3>}
              iconPosition="start"
              label="POSTS"
            />
            {/* <NavLink to={`/user/${user?.userNickName}/posts`}></NavLink> */}

            <Tab
              icon={<MdOutlinePersonPin size={12}></MdOutlinePersonPin>}
              iconPosition="start"
              sx={{ marginLeft: 8 }}
              label="TAGGED"
            ></Tab>
          </Tabs>
        </div>

        <Outlet
          context={{
            userProfiePage: {
              userPosts: user.userPosts,
              userInfo: {
                userProfilePicture: user.userProfilePicture,
                _id: user._id,
                userNickName: user.userNickName,
              },
            },
          }}
        ></Outlet>
      </nav>
    </div>
  ) : (
    <ProfileNotFound></ProfileNotFound>
  );
};

export default ProfilePage;
