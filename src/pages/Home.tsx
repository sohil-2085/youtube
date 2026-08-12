import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchVideos } from "../utils/api";
import "./Home.css";
// import VideoCard from "../components/VideoCard";

interface video {
  id: number;
  thumbnailKey: string;
  category: string;
  title: string;
  viewCount: number;
  likeCount: number;
}

function Home() {
  const navigate = useNavigate();
  const authToken: string = sessionStorage.getItem("auth_token") || "";

  // const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["videos"],
    queryFn: () => fetchVideos(authToken),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, []);

  if (isPending) return <h1>Loading...</h1>;
  if (isError) return error;

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
      <div className="grid grid-cols-4 p-12 gap-10 bg-slate-900">
        {data.data.map((video: video) => (
          <Link
            to={`/video/${video.id}`}
            key={video.id}
            className="text-white hover:bg-slate-600 hover:ease-in-out transition-all duration-500 hover:translate-x-3 hover:p-2 rounded-lg"
          >
            {/* <VideoCard
              thumbnail={`https://test-dev-sena.s3.ap-south-1.amazonaws.com/${video.thumbnailKey}`}
              title={video.title}
              category={video.category}
              viewCount={video.viewCount}
              likeCount={video.likeCount}
            /> */}
            <div className="w-full h-48 overflow-hidden rounded-lg">
              <img
                src={`https://test-dev-sena.s3.ap-south-1.amazonaws.com/${video.thumbnailKey}`}
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col p-5 gap-2">
              <h1 className="text-xl font-bold">{video.title}</h1>
              <h2 className="font-semibold opacity-60">{video.category}</h2>
              <div className="flex justify-between opacity-50">
                <span>{video.viewCount} Liked</span>
                <span>{video.likeCount} Views</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Home;
