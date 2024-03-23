import { createContext, useContext } from "react";
import { MEDIAJSON } from "../constants/VideoPlayerConstants";

export const VideoPlayerContext = createContext({
  videos: [MEDIAJSON.categories[0].videos],
  currentId: 0,
  updateVideoTime: (seekTime) => {},
  onSelectIndex: () => {},
  videoDetails: {},
});

export const useVideoPlayerContext = () => useContext(VideoPlayerContext);
