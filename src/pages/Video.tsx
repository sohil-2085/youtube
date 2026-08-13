import { useParams } from "react-router-dom";
import { fetchOneVideo } from "../utils/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import ReactPlayer from "react-player";
// import "@videojs/react/video/skin.css";
// import { createPlayer, videoFeatures } from "@videojs/react";
// import { VideoSkin, Video } from "@videojs/react/video";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";
import Recomended from "../components/Recomended";
import { useEffect, useState } from "react";
import "./Video.css";
import { useNavigate } from "react-router-dom";

// interface videoData {
//   thumbnail: string;
//   title: string;
//   category: string;
//   viewCount: number;
//   likeCount: number;
// }

function VideoPage() {
  const authToken: string = sessionStorage.getItem("auth_token") || "";
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["video", id],
    queryFn: () => fetchOneVideo(id || "", authToken),
    enabled: !!id && !!authToken,
    placeholderData: keepPreviousData,
  });
  const navigate = useNavigate();
  console.log(data);

  const [isMiniPlayer, setIsMiniPlayer] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.target as HTMLElement).tagName === "INPUT" ||
        (event.target as HTMLElement).tagName === "TEXTAREA"
      ) {
        return;
      }
      console.log(event.key);
      if (event.key.toLowerCase() === "i") {
        setIsMiniPlayer((prev) => !prev);
        navigate(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!data?.data) return <h1>Loading...</h1>;

  return (
    <>
      <Header />
      <div className="bg-slate-900 grid grid-cols-3 p-10 h-screen text-white gap-18 ">
        <div className="col-span-2">
          <MediaController
            style={{
              width: "100%",
              aspectRatio: "16/9",
            }}
          >
            <ReactPlayer
              slot="media"
              src={`https://test-dev-sena.s3.ap-south-1.amazonaws.com/${data.data.videoKey}`}
              // controls={false}
              pip={isMiniPlayer}
              controls={false}
              style={{
                width: "100%",
                height: "100%",
              }}
            ></ReactPlayer>
            <MediaControlBar>
              <MediaPlayButton />
              <MediaSeekBackwardButton seekOffset={10} />
              <MediaSeekForwardButton seekOffset={10} />
              <MediaTimeRange />
              <MediaTimeDisplay showDuration />
              <MediaMuteButton />
              <MediaVolumeRange />
              <MediaPlaybackRateButton />
              <MediaFullscreenButton />
            </MediaControlBar>
          </MediaController>
          <div className="flex justify-between">
            {/* <div className={isMiniPlayer ? "mini_player_title" : ""}> */}
            <div>
              <h1
                className={
                  isMiniPlayer
                    ? "mini_player_title"
                    : "sm:text-xl md:text-3xl font-bold mt-4"
                }
              >
                {data.data.title}
              </h1>
              <p className="mt-2 bg-gray-700 p-2 rounded-lg">
                {data.data.description}
              </p>
            </div>
            <div className="mt-4 flex gap-8">
              <div className="flex gap-2">
                <span>{data.data.likeCount}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  />
                </svg>
              </div>
              <div className="flex gap-2">
                <span>{data.data.likeCount}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-scroll">
          <Recomended />
        </div>
      </div>
    </>
  );
}

export default VideoPage;
