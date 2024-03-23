import React, { useRef, useState, useEffect, useContext } from "react";
import "./VideoPlayer.scss";
import { VideoPlayerContext } from "../Context/PlayListContext";
import { SPEED_OPTIONS } from "../VideoPlayerConstants/VideoPlayerConstants";

function VideoPlayer() {
  const videoRef = useRef(null);
  const seekBarRef = useRef(null);
  const { videos, currentId, onSelectIndex, updateVideoTime, videoDetails } =
    useContext(VideoPlayerContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [openPlaybackSpeedDialog, setOpenPlaybackSpeedDialog] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedSpeedOption, setSelectedSpeedOption] = useState(1);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volumeValue, setVolumeValue] = useState(50);
  const [previousVolumeValue, setPreviousVolumeValue] = useState(50);
  const [_hoverStates, setHoverStates] = useState(
    SPEED_OPTIONS.map(() => false)
  );
  const [volumeHovered, setVolumeHovered] = useState(false);
  const [index, setIndex] = useState(0);

  const handleMouseEnter = (index) => {
    setHoverStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = true;
      return newStates;
    });
  };

  const handleMouseLeave = (index) => {
    setHoverStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };

  const handleVolumeHover = () => {
    setVolumeHovered(true);
  };

  const handleVolumeLeave = () => {
    setVolumeHovered(false);
  };

  useEffect(() => {
    setIndex(videos.findIndex((video) => video.id === currentId));
  }, [currentId, videos]);

  useEffect(() => {
    const video = videoRef.current;
    setCurrentTime(0);
    if (video) {
      video.addEventListener("timeupdate", updateTime);
      video.addEventListener("loadedmetadata", () => {
        setDuration(video.duration);
        seekBarRef.current.max = video.duration;
      });
      video.currentTime = videoDetails.lastPlayed;
      setCurrentTime(videoDetails.lastPlayed);
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log(
            "Chrome cannot play sound without user interaction first"
          );
          setIsPlaying(false);
        });
      return () => {
        if (video) {
          video.removeEventListener("timeupdate", updateTime);
        }
      };
    }
  }, [currentId]);

  useEffect(() => {
    videoRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volumeValue / 100;
    }
  }, [volumeValue, previousVolumeValue]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const updateTime = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
    updateVideoTime("seek", video.currentTime, currentId);
    if (video.currentTime >= video.duration) {
      setIsPlaying(false);
    }
    if (
      video.currentTime >= video.duration &&
      autoplay &&
      index < videos.length - 1
    ) {
      onSelectIndex(videos[index + 1].id);
    }
  };

  const handleSeek = (event) => {
    const video = videoRef.current;
    const newTime = event.target.value;
    video.currentTime = newTime;
    setCurrentTime(newTime);
    updateVideoTime("seek", newTime, currentId);
  };

  const convertTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes}: ${remainingSeconds}`;
    } else if (minutes > 0) {
      return `${minutes}:${
        remainingSeconds <= 9 ? `0${remainingSeconds}` : `${remainingSeconds}`
      }`;
    } else if (minutes == 0 && remainingSeconds > 9) {
      return `0:${remainingSeconds}`;
    } else if (remainingSeconds <= 9) {
      return `0:0${remainingSeconds}`;
    }
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (video && video.requestFullscreen) {
      video.requestFullscreen().catch((error) => {
        console.error("Failed to enter fullscreen mode:", error);
      });
    }
  };

  const toggleMute = () => {
    if (volumeValue == 0) {
      setMute(true);
    }
    if (mute) {
      setVolumeValue(previousVolumeValue);
    } else {
      setVolumeValue(0);
    }
    setMute(!mute);
  };

  const toggleAutoPlay = () => {
    setAutoplay(!autoplay);
  };

  const handleSpeedChange = (option) => {
    setPlaybackSpeed(parseFloat(option.value));
    setSelectedSpeedOption(option.index);
    setOpenPlaybackSpeedDialog(false);
  };

  const handlePreviousInPlaylist = () => {
    onSelectIndex(videos[index - 1].id);
  };

  const handleNextInPlaylist = () => {
    onSelectIndex(videos[index + 1].id);
  };

  const calculateVolumeBarWidth = (currentVolume) => {
    const ratio = Math.min(currentVolume / 100, 1);
    return `${ratio * 100}%`;
  };

  const handleKeyDown = (e) => {
    if (e.target && e.target.id === "playlist-file-search") {
      return;
    }
    switch (e.key) {
      case " ":
        togglePlayPause();
        break;
      case "ArrowLeft":
        seekBackward();
        break;
      case "ArrowRight":
        seekForward();
        break;
      case "Enter":
        if (e.altKey) {
          toggleFullScreen();
        }
        break;
      case "ArrowUp":
        increaseVolume();
        break;
      case "ArrowDown":
        decreaseVolume();
        break;
      default:
        break;
    }
  };
  // Seek backward by 5 seconds
  const seekBackward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.max(0, video.currentTime - 5);
    }
  };

  // Seek forward by 5 seconds
  const seekForward = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.min(video.duration, video.currentTime + 5);
    }
  };
  // Increase volume by 10
  const increaseVolume = () => {
    const video = videoRef.current;
    if (video) {
      const newVolume = Math.min(100, video.volume * 100 + 10);
      video.volume = newVolume / 100;
      setVolumeValue(newVolume);
      setVolumeHovered(true);
    }
  };

  // Decrease volume by 10
  const decreaseVolume = () => {
    const video = videoRef.current;
    if (video) {
      const newVolume = Math.max(0, video.volume * 100 - 10);
      video.volume = newVolume / 100;
      setVolumeValue(newVolume);
      setVolumeHovered(true);
    }
  };

  useEffect(() => {
    // Add event listener for keydown when component mounts
    document.addEventListener("keydown", handleKeyDown);
    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex-1 video-player-main-content flex-column gap-8">
      <div className="video-player ">
        <video
          onDoubleClick={toggleFullScreen}
          onClick={togglePlayPause}
          ref={videoRef}
          src={videoDetails.sources[0]}
          className="video-player-video-main"
        ></video>
        <div className="video-player-seek-bar full-width">
          <input
            ref={seekBarRef}
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            className="video-player-seek-bar-input"
            onChange={handleSeek}
          />
          <progress
            className="video-progress"
            min="0"
            value={currentTime}
            max={duration}
          ></progress>
        </div>
        <div className="video-player-controls">
          <div className="flex-row align-items-center gap-6">
            {index > 0 && (
              <img
                className="next-icon cursor-pointer"
                src="https://d2k6zobmg5lufr.cloudfront.net/assets%2F20240321125450-previous-multimedia.svg"
                alt="previous-icon"
                onClick={handlePreviousInPlaylist}
              />
            )}
            <img
              onClick={togglePlayPause}
              className="next-icon cursor-pointer"
              src={
                isPlaying
                  ? "https://d2k6zobmg5lufr.cloudfront.net/assets%2F20240321125450-Stop_fill.svg"
                  : "https://d2k6zobmg5lufr.cloudfront.net/assets%2F20240321125450-Play_fill.svg"
              }
              alt={isPlaying ? "stop-icon" : "play-icon"}
            />

            {index < videos.length - 1 && (
              <img
                className="next-icon cursor-pointer"
                src="https://d2k6zobmg5lufr.cloudfront.net/assets%2F20240321125450-next-multimedia.svg"
                alt="next-icon"
                onClick={handleNextInPlaylist}
              />
            )}

            <div
              onMouseEnter={handleVolumeHover}
              onMouseLeave={handleVolumeLeave}
              className=" flex-row position-relative gap-4 align-items-center"
            >
              <img
                onClick={toggleMute}
                className="next-icon control-icon cursor-pointer"
                src={
                  volumeValue > 0
                    ? "https://d2k6zobmg5lufr.cloudfront.net/assets%2F20240321125450-Volume+up.svg"
                    : "https://d2k6zobmg5lufr.cloudfront.net/assets%2F20240321125450-Volume+off+3.svg"
                }
                alt="volume-icon"
              />
              {volumeHovered && (
                <div className="flex-row position-relative">
                  <input
                    onChange={(e) => {
                      setVolumeValue(e.target.value);
                      setPreviousVolumeValue(e.target.value);
                    }}
                    value={volumeValue}
                    className="volume-seek-control-input volume-seek-radius"
                    type="range"
                    min={0}
                    max={100}
                  />
                  <input
                    style={{
                      width: `${calculateVolumeBarWidth(volumeValue)}`,
                      background: "white",
                    }}
                    className="volume-seek-control-input current_volume"
                    type="range"
                  />
                </div>
              )}
            </div>

            <div className="flex-row align-items-center gap-5">
              <div className="video-player-duration">
                {convertTime(currentTime)}
              </div>
              <div className="video-player-duration">/</div>
              <div className="video-player-duration">
                {convertTime(duration)}
              </div>
            </div>
          </div>

          <div className="controls-right-container flex-row align-items-center gap-10">
            <div className="flex-row align-items-center gap-8">
              <div
                onClick={toggleAutoPlay}
                className={`autoplay-main-container flex-row cursor-pointer p-2 ${
                  autoplay && "justify-content-flex-end"
                }`}
              >
                <p
                  style={{ background: `${autoplay ? "red" : "white"}` }}
                  className="autoplay-circle"
                ></p>
              </div>
            </div>
            <div className="video-player-speed-control flex-row align-items-center gap-4 position-relative">
              <label
                onClick={() =>
                  setOpenPlaybackSpeedDialog(!openPlaybackSpeedDialog)
                }
                className="cursor-pointer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "14px",
                }}
                htmlFor="speed"
              >
                {" "}
                <img
                  className="next-icon control-icon"
                  src="https://d2k6zobmg5lufr.cloudfront.net/assets%2F20240321125932-179-1792540_dior-white-transparent-play-button-removebg-preview.webp"
                  alt="playback-speed-icon"
                />
                <p>{SPEED_OPTIONS[selectedSpeedOption].value}X </p>
              </label>
              {openPlaybackSpeedDialog && (
                <div
                  className="options-container flex-column p-4 "
                  style={{ marginTop: "4px" }}
                >
                  {SPEED_OPTIONS.map((option, index) => {
                    return (
                      <div
                        key={index}
                        className="option-row flex-row align-items-center gap-8"
                        style={{
                          color:
                            selectedSpeedOption === index
                              ? "#5151EC"
                              : "#484848",
                        }}
                        onClick={() => handleSpeedChange(option)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                      >
                        <span className=" xetgo-font-tag"> {option.text} </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <img
              onClick={toggleFullScreen}
              className="next-icon control-icon cursor-pointer"
              src="https://d2k6zobmg5lufr.cloudfront.net/assets%2F20240321125450-Full.svg"
              alt="maximize-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
