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
  return (
    <div className=" ">
      <div className="w-full h-48 overflow-hidden rounded-lg">
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col p-5 gap-2">
        <h1 className="text-xl font-bold">{title}</h1>
        <h2 className="font-semibold opacity-60">{category}</h2>
        <div className="flex justify-between opacity-50">
          <span>{likeCount} Liked</span>
          <span>{viewCount} Views</span>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
