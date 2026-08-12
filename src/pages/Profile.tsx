import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (!sessionStorage.getItem("auth_token")) {
      return;
    }
    sessionStorage.removeItem("auth_token");
    navigate("/");
    window.location.reload();
  };
  return (
    <div>
      <button className="border p-4 " onClick={handleLogout}>
        LogOut
      </button>
    </div>
  );
}

export default Profile;
