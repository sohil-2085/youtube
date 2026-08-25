import { Outlet, useNavigate } from "react-router-dom";
import { useMiniPlayer } from "./context/MiniPlayerContext";
import ReactPlayer from "react-player";
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
import "./pages/Video.css";

function Layout() {
  const { miniPlayer, setMiniPlayer } = useMiniPlayer();
  const navigate = useNavigate();

  return (
    <>
      <Outlet />
      
      {miniPlayer.isActive && miniPlayer.videoKey && (
        <div className="mini_player">
          <div className="flex justify-between items-center bg-gray-900 px-2 py-1">
            <span className="text-white text-xs font-bold truncate pr-2">Mini Player</span>
            <button 
              onClick={() => setMiniPlayer((prev: any) => ({ ...prev, isActive: false }))}
              className="text-white hover:text-red-500 cursor-pointer text-sm"
            >
              ✕
            </button>
          </div>
          <MediaController
            style={{
              width: "100%",
              aspectRatio: "16/9",
            }}
          >
            <ReactPlayer
              slot="media"
              src={miniPlayer.videoKey ? `https://test-dev-sena.s3.ap-south-1.amazonaws.com/${miniPlayer.videoKey}` : undefined}
              controls={false}
              playing={true}
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
          <div 
            className="mini_player_title cursor-pointer hover:bg-slate-800"
            onClick={() => {
              if (miniPlayer.videoId) {
                navigate(`/video/${miniPlayer.videoId}`);
              }
              setMiniPlayer((prev: any) => ({ ...prev, isActive: false }));
            }}
          >
            {miniPlayer.title}
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
