import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchVideos, fetchAccessToken } from "../utils/api";
import Header from "../components/Header";
import toast, { Toaster } from "react-hot-toast";
import VideoCard from "../components/VideoCard";
// import VideoCard from "../components/VideoCard";

interface video {
  id: number;
  thumbnailKey: string;
  category: string;
  title: string;
  viewCount: number;
  likeCount: number;
  videoKey: string;
}

function Home() {
  const navigate = useNavigate();
  const authToken: string = sessionStorage.getItem("auth_token") || "";
  const refreshToken: string = sessionStorage.getItem("session_token") || "";

  // const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["videos"],
    queryFn: () => fetchVideos(authToken),
    placeholderData: keepPreviousData,
  });

  const fetchNewTokens = async () => {
    if (!refreshToken) {
      return;
    }
    const data = await fetchAccessToken(refreshToken);
    console.log(data);
  };

  useEffect(() => {
    if (error === null) {
      if (!refreshToken) {
        toast.error("Login Required");
        navigate("/login");
      }
      fetchNewTokens();
    }
  }, []);
  console.log("test", error);

  if (isPending) return <h1>Loading...</h1>;
  if (isError) return <h1>Error: {error.message}</h1>;

  console.log(data.data);

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
      <div className="grid grid-cols-4 p-12 gap-10 bg-slate-900">
        {data.data.map((video: video) => (
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
            />
          </Link>
        ))}
        <Toaster />
      </div>
    </>
  );
}

export default Home;
