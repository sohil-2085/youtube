import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { getUserDetails } from "../utils/api";

// interface user {
//   id: number;
//   email: string;
//   name: string;
//   role: string;
//   channelName: string;
// }

function Profile() {
  const navigate = useNavigate();
  // const authToken: string = sessionStorage.getItem("auth_token") || ""
  // const sessionToken: string = sessionStorage.getItem("session_token") || ""


  const handleLogout = () => { 
    if (!sessionStorage.getItem("auth_token")) {
      return;
    }
    sessionStorage.removeItem("auth_token");
    console.log("testetysdg")
    toast.success("Logout Successfully");
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
