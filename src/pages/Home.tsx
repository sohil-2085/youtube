import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchVideos, fetchAccessToken } from "../utils/api";

import toast, { Toaster } from "react-hot-toast";
import VideoCard from "../components/VideoCard";
import Spinner from "../components/Spinner";
// import VideoCard from "../components/VideoCard";

interface video {
  id: number;
  thumbnailKey: string;
  category: string;
  title: string;
  viewCount: number;
  likeCount: number;
  videoKey: string;
  owner?: {
    name: string;
  };
}

function Home() {
  const navigate = useNavigate();
  const authToken: string = sessionStorage.getItem("auth_token") || "";
  const refreshToken: string = sessionStorage.getItem("session_token") || "";
  // const [search, setSearch] = useState("test");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["videos", currentPage, pageSize],
    queryFn: () => fetchVideos(authToken, currentPage, pageSize),
    placeholderData: keepPreviousData,
  });

  const videos = data?.data || [];
  const totalVideos = data?.meta?.total || videos.length;
  const totalPages = Math.max(
    1,
    data?.meta?.totalPages || Math.ceil(totalVideos / pageSize),
  );
  const currentCurrentPage = Math.min(currentPage, totalPages);
  const paginatedVideos = videos;

  const fetchNewTokens = useCallback(async () => {
    if (!refreshToken) {
      return;
    }
    const data = await fetchAccessToken(refreshToken);
    console.log(data);
  }, [refreshToken]);

  useEffect(() => {
    if (error !== null) {
      return;
    }

    if (!refreshToken) {
      toast.error("Login Required");
      navigate("/login");
      return;
    }

    fetchNewTokens();
  }, [error, fetchNewTokens, navigate, refreshToken]);
  console.log("test", error);

  if (isPending) return <Spinner />;
  if (isError) return <h1>Error: {error.message}</h1>;

  console.log(data?.data);
  const searching = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.value && e.target.value.length > 0){
      setSearch(e.target.value)
    }
  }
  // const videoObj = {
  //   thumbnail:`https://test-dev-sena.s3.ap-south-1.amazonaws.com/${video.thumbnailKey}`,
  //             title:video.title,
  //             category:video.category,
  //             viewCount:video.viewCount,
  //             likeCount:video.likeCount,
  // }

  return (
    <>
      {/* <Header /> */}
      <div className="bg-slate-900 px-12 py-6 flex justify-between items-center sticky">
        <Link to="/" className="text-white ">
          {/* <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          > */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1280px-YouTube_full-color_icon_%282017%29.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail"
            alt=""
            width={50}
          />
          {/* </svg> */}
        </Link>
        <form className="max-w-md mx-auto">
          <label
            htmlFor="search"
            className="block mb-2.5 text-sm font-medium text-heading sr-only "
          >
            Search
          </label>
          <div className="relative flex items-center gap-3">
            <div className="absolute inset-y-0 insert-s-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <div className="bg-gray-700 rounded-lg text-white">
              <input
                name="search"
                type="search"
                id="search"
                className="block w-125 p-3 ps-9 bg-neutral-secondary-medium border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-white"
                placeholder="Search"
                required
                onChange={searching}
              />
            </div>
            <div>
              <button
                className="text-white border p-2.5 rounded-lg cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        <Link to="/profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="size-12 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
        <Link to="/upload" className="text-white ml-4">
          Upload
        </Link>
      </div>
      <div className="bg-slate-900 min-h-screen p-12">
        <div className="grid grid-cols-4 gap-10">
          {paginatedVideos.map((video: video) => (
            <Link
              to={`/video/${video.id}`}
              key={video.id}
              className="text-white hover:bg-slate-600 hover:ease-in-out transition-all duration-500 hover:translate-x-3 hover:p-2 rounded-lg"
            >
              <VideoCard
                thumbnail={`https://test-dev-sena.s3.ap-south-1.amazonaws.com/${video.thumbnailKey}`}
                title={video.title}
                category={video.category}
                viewCount={video.viewCount}
                likeCount={video.likeCount}
                owner={video.owner?.name || "Unknown"}
              />
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-8 text-white">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            disabled={currentCurrentPage === 1}
            className="px-4 py-2 rounded bg-slate-700 disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {currentCurrentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.min(page + 1, totalPages))
            }
            disabled={currentCurrentPage === totalPages}
            className="px-4 py-2 rounded bg-slate-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <Toaster />
      </div>
    </>
  );
}

export default Home;
