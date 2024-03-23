import React, { useContext } from "react";
import "./VideoDetails.scss";
import { VideoPlayerContext } from "../../context/PlayListContext";

const VideoDetails = () => {
  const { videoDetails } = useContext(VideoPlayerContext);

  return (
    <div className="video-player-descriptive-box flex-column gap-10 py-16">
      <div className="flex-row gap-12 align-items-center">
        <img
          className="thumb-dp"
          src="https://d2k6zobmg5lufr.cloudfront.net/assets%2F20240323122633-pngtree-man-avatar-with-circle-frame-vector-ilustration-png-image_6110328.webp"
          alt="profile"
          height={44}
          width={44}
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
