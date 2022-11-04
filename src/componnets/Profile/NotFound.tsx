import React,{useEffect} from "react";
import { Link } from "react-router-dom";

const ProfileNotFound = () => {
  useEffect(() => {
console.log("çağrıldı")
  }, [])
  
  return (
    <div className="text-center grid gap-y-5 pt-6 ">
      <h6 className="text-[22px] font-semibold">
        Sorry This page isn't available
      </h6>
      <p>
        The Link you followed by broken, or the page may have been remocved.{" "}
        <Link className="text-link" to={"/"}>
          Go back Home
        </Link>
      </p>
    </div>
  );
};

export default ProfileNotFound;
