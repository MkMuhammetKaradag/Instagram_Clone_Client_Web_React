import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const HomePage = () => {
  useEffect(() => {
    console.log("uuuu");
  }, []);
  return (
    <div>
      <Helmet>
        <title>Instagram</title>
      </Helmet>
      Merhaba chat
    </div>
  );
};

export default HomePage;
