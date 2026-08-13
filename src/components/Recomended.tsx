import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchRecomendedVideos } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import VideoCard from "./VideoCard";

interface Video {
  id: number;
  thumbnailKey: string;
  category: string;
  title: string;
  viewCount: number;
  likeCount: number;
  videoKey: string;
}

function Recomended() {
  const authToken = sessionStorage.getItem("auth_token") || "";
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["reco", id],
    queryFn: () => fetchRecomendedVideos(id!, authToken),
    enabled: !!id,
    placeholderData: keepPreviousData,
    gcTime: 5000,
    staleTime: 1000,
  });

  return (
    <div>
      {data?.data?.map((video: Video) => (
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
    </div>
  );
}

export default Recomended;