import toast, { Toaster } from "react-hot-toast";
import { uploadImage } from "../utils/api";
import { useState } from "react";

function Upload() {
  const [img, setImg] = useState()
  const authToken = sessionStorage.getItem("auth_token") || "";
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const title: FormDataEntryValue = formData.get("title") || "";
    const desc: FormDataEntryValue = formData.get("description") || "";
    const category: FormDataEntryValue = formData.get("category") || "";
    const image = formData.get("image") || null;
    const video: FormDataEntryValue = formData.get("video") || "";
    console.log("image", image);
    const data = await uploadImage(authToken, image);
    console.log("data", data);
    console.log("url", data.data.url);
    // const putReq = await fetch(data.data.url, {
    //   method: "put",
    //   body: image,
    //   headers: {
    //     "Content-Type": image.type,
    //   },
    // });
    const res = await fetch(data.data.url, {
      method: "put",
      headers: {
        "Content-Type": data.type,
      },
      body: image,
    });
    if (res.ok) {
      toast.success("Image Uploaded");
      setImg(data.data.key)
    }
    // console.log(await res.json());
    console.log(title, desc, category, image, video);
  };
  return (
    <>
      <div className="flex justify-center my-30">
        <div className="border-2 inline-block p-10 ">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold">Upload</h1>
          </div>
          {/*here we have to add the onsubmit functionality*/}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <span>Title</span>
            <input
              name="title"
              type="text"
              className="border-2 w-75 p-2"
              placeholder="Enter your video title"
            />
            <span>description</span>
            <input
              name="description"
              type="text"
              className="border-2 w-75 p-2"
              placeholder="Enter your video description"
            />
            <span>category</span>
            <input
              name="category"
              type="text"
              className="border-2 w-75 p-2"
              placeholder="Enter your video category"
            />
            <span>Thumbnail Image</span>
            <input
              name="image"
              type="file"
              className="border-2 w-75 p-2 cursor-pointer"
            />
            <span>Video</span>
            <input
              name="video"
              type="file"
              className="border-2 w-75 p-2 cursor-pointer"
            />
            <button
              type="submit"
              className="border rounded-xl mt-4 cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
        <img src={`https://test-dev-sena.s3.ap-south-1.amazonaws.com/${img}`} alt="" />
        <Toaster />
      </div>
    </>
  );
}

export default Upload;
