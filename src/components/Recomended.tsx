import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchRecomendedVideos } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import VideoCard from "./VideoCard";
import { useState } from "react";
import Spinner from "./Spinner";

interface Video {
  id: number;
  thumbnailKey: string;
  category: string;
  title: string;
  viewCount: number;
  likeCount: number;
  videoKey: string;
  owner: {
    name: string;
  };
}

function Recomended() {
  const authToken = sessionStorage.getItem("auth_token") || "";
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { data, isPending, isFetching } = useQuery({
    queryKey: ["reco", id, currentPage, pageSize],
    queryFn: () => fetchRecomendedVideos(id!, authToken, currentPage, pageSize),
    enabled: !!id,
    placeholderData: keepPreviousData,
    gcTime: 5000,
    staleTime: 1000,
  });
  const videos = data?.data || [];
  const totalVideos = data?.meta?.total || videos.length;
  const totalPages = Math.max(
    1,
    data?.meta?.totalPages || Math.ceil(totalVideos / pageSize)
  );
  const currentCurrentPage = Math.min(currentPage, totalPages);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spinner />
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 transition-opacity duration-300 ${isFetching ? "opacity-50 pointer-events-none" : ""}`}>
      {videos.map((video: Video) => (
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
            owner={video.owner.name}
          />
        </Link>
      ))}
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8 mb-8 text-white">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            disabled={currentCurrentPage === 1}
            className="px-4 py-2 rounded bg-slate-700 disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>

          <span>
            Page {currentCurrentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
            disabled={currentCurrentPage === totalPages}
            className="px-4 py-2 rounded bg-slate-700 disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Recomended;
