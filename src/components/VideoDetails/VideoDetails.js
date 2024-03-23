import React, { useContext } from "react";
import "./VideoDetails.scss";
import { VideoPlayerContext } from "../Context/PlayListContext";

const VideoDetails = () => {
  const { videoDetails } = useContext(VideoPlayerContext);

  return (
    <div className="video-player-descriptive-box flex-column gap-10 py-16">
      <div className="flex-row gap-12 align-items-center">
        <img
          className="thumb-dp"
          src="https://plus.unsplash.com/premium_photo-1670071482248-f647a17c7d9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM1fGFldTZyTC1qNmV3fHxlbnwwfHx8fHw%3D"
          alt="display"
        />
        <div className="flex-column gap-4 py-16">
          <p className="descriptive-heading">{videoDetails.title}</p>
          <p className="descriptive-sub-heading">{videoDetails.subtitle}</p>
        </div>
      </div>
      <div className="video-description-box p-16 border-box">
        <p className="about-section-heading">About This Video</p>
        <div className="more-info-box py-16 flex-column gap-16">
          <div className="flex-row gap-8">
            <p>Source:</p>
            <a
              target="blank"
              href={videoDetails.sources[0]}
              className="video-source-link"
            >
              {videoDetails.sources[0]}
            </a>
          </div>
          <p className="description-video-below">{videoDetails.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
