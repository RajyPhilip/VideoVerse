import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import Playlist from "./components/Playlist/Playlist";
import VideoDetails from "./components/VideoDetails/VideoDetails";
import { useState } from "react";
import { MEDIAJSON } from "./constants/VideoPlayerConstants";
import { VideoPlayerContext } from "./context/PlayListContext";
import "./helper_classes.scss";
import "./App.scss";

function App() {
  const [videoDetailsId, setVideoDetailsId] = useState(111);
  const [allVideos, setAllVideos] = useState(MEDIAJSON.categories[0].videos);
  const videoDetails = allVideos.filter(
    (video) => video.id === videoDetailsId
  )[0];
  const handleVideoChange = (id) => {
    setVideoDetailsId(id);
  };
  const updateVideoTime = (key, value, id, newValue) => {
    if (key === "seek") {
      setAllVideos((prev) =>
        prev.map((video) => {
          if (video.id === id) {
            return { ...video, lastPlayed: value };
          }
          return video;
        })
      );
    }
    if (key === "search") {
      setAllVideos((prev) =>
        prev.map((video) => {
          return {
            ...video,
            show: video.title.toLowerCase().includes(value.toLowerCase()),
          };
        })
      );
    }
    if (key === "reorder") {
      const items = Array.from(allVideos);
      const [reorderedItem] = items.splice(value, 1);
      items.splice(newValue, 0, reorderedItem);
      setAllVideos(items);
    }
  };

  return (
    <VideoPlayerContext.Provider
      value={{
        videos: allVideos,
        currentId: videoDetailsId,
        onSelectIndex: handleVideoChange,
        updateVideoTime: updateVideoTime,
        videoDetails: videoDetails,
      }}
    >
      <div className="p-16 main-page border-box border-box flex-column gap-4 align-items-center ">
        <div className="main-page-content border-box ">
          <div className="main-page-upper-container flex-row ">
            <VideoPlayer />
            <Playlist />
          </div>
          <VideoDetails />
        </div>
      </div>
    </VideoPlayerContext.Provider>
  );
}

export default App;
