import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (!sessionStorage.getItem("auth_token")) {
      return;
    }
    sessionStorage.removeItem("auth_token");
    toast.success("Logout Successfully")
    navigate("/login");
    // window.location.reload();
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
