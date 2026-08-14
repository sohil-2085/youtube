import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchVideos, fetchAccessToken } from "../utils/api";
import Header from "../components/Header";
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

  // const videoObj = {
  //   thumbnail:`https://test-dev-sena.s3.ap-south-1.amazonaws.com/${video.thumbnailKey}`,
  //             title:video.title,
  //             category:video.category,
  //             viewCount:video.viewCount,
  //             likeCount:video.likeCount,
  // }

  return (
    <>
      <Header />
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

        {/* <div className="flex items-center justify-center gap-4 mt-8 text-white">
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
        </div> */}

        <Toaster />
      </div>
    </>
  );
}

export default Home;
