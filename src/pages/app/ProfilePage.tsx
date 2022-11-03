import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, getUserType } from "../../api";
import toast from "react-hot-toast";
import Header from "../../componnets/Profile/Header";
const ProfilePage = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<getUserType | null>(null);
  useEffect(() => {
    console.log("kaçkere");
    getUser(userName)
      .then((res) => {
        if (res?.data.user) {
          // console.log(res.data.user);
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        // console.log(err);
        navigate("/", {
          replace: true,
        });
      });
  }, []);

  return (
    <div>
      <Header user={user}></Header>
    </div>
  );
};

export default ProfilePage;
