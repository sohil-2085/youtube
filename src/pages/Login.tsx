import React from "react";
import { useNavigate } from "react-router-dom";
import { useSessionToken } from "../utils/sessionStorage";
import toast, { Toaster } from "react-hot-toast";

// import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { setToken } = useSessionToken();
  const api = import.meta.env.VITE_API;
  // const [formState, setFormState] = React.useState({
  //   email: "",
  //   password: "",
  // });
  // const onChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
  //   e.preventDefault();
  //   setFormState({
  //     ...formState,
  //     [type]: e.target.value,
  //   });
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const url = `${api}/auth/login`;
    const sendData = await fetch(url, {
      method: "post",
      headers: {
        // needed so express parser says the body is OK to read
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await sendData.json();
    console.log("print", data);
    if (!data?.success) {
      console.log("test");
      toast("Error");
      return;
    }
    setToken(data.data.accessToken);
    toast.success("Login Successfully");
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-center my-40">
        <div className="border-2 inline-block p-10 ">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          {/*here we have to add the onsubmit functionality*/}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <span>Email</span>
            <input
              name="email"
              type="text"
              className="border-2 w-75 p-2"
              placeholder="Enter your email id"
              defaultValue="sohil@techeniac.com"
            />
            <span>Password</span>
            <input
              name="password"
              type="password"
              className="border-2 w-75 p-2"
              placeholder="Enter your password"
              defaultValue="TechEniac@123"
            />
            <button
              type="submit"
              className="border rounded-xl mt-4 cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default Login;
