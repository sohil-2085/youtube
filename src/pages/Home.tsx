import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchVideos } from "../utils/api";

function Home() {
  const navigate = useNavigate();
  const authToken: string = sessionStorage.getItem("auth_token") || "";

  const queryClient = useQueryClient();

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

  return (
    <>
      <div className="grid grid-cols-4">
        {data.data.map((video) => (
          <div key={video.id}>
            <div>
              <img
                src={`https://test-dev-sena.s3.ap-south-1.amazonaws.com/${video.thumbnailKey}`}
                alt=""
                width={300}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
