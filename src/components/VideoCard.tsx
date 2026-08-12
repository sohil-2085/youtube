import React from "react";

interface videoData {
  thumbnail: string;
  title: string;
  category: string;
  viewCount: number;
  likeCount: number;
}

function VideoCard({
  thumbnail,
  title,
  category,
  viewCount,
  likeCount,
}: videoData) {
  console.log(thumbnail, title, category, viewCount, likeCount);
  return (
    <>
      <div></div>
    </>
  );
}

export default VideoCard;
