import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!sessionStorage.getItem("auth_token")) {
      navigate("/login");
    }
  }, []);
  return <div>Home Page</div>;
}

export default Home;
