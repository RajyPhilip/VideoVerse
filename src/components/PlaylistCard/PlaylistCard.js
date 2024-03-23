import React, { useContext } from "react";
import "./PlaylistCard.scss";
import { VideoPlayerContext } from "../../context/PlayListContext";

const PlaylistCard = ({ videoDetails, index }) => {
  const { onSelectIndex, currentId } = useContext(VideoPlayerContext);
  return (
    <div
      onClick={() => onSelectIndex(videoDetails.id)}
      className={`playlist-card-main-container cursor-pointer ${
        currentId === videoDetails.id && "playlist-card-main-container-selected"
      }`}
    >
      <p>{index + 1}</p>
      <div className="playlist-card-left-container">
        <div className="playlist-card-img-container flex-row justify-content-center px-10 border-box">
          <img
            className="playlistCard-thumbnail"
            src={videoDetails.thumb}
            loading="lazy"
            alt="thumbnail"
          />
        </div>
      </div>
      <div className="playlist-card-right-container flex-column gap-4">
        <p className="playlist-card-title">{videoDetails.title}</p>
        <p className="playlist-card-subtitle">{videoDetails.subtitle}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
