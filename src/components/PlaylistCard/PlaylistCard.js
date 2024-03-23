import React, { useContext } from "react";
import "./PlaylistCard.scss";
import { VideoPlayerContext } from "../Context/PlayListContext";

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
            src="https://plus.unsplash.com/premium_photo-1682145358254-56e9ab8049ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMyfGFldTZyTC1qNmV3fHxlbnwwfHx8fHw%3D"
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
