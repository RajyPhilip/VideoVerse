import "./App.scss";
import "./helper_classes.scss";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import Playlist from "./components/Playlist/Playlist";
import VideoDetails from "./components/VideoDetails/VideoDetails";

function App() {
  return (
    <div className="main-page ">
      <div className="main-page-content border-box p-32">
        <div className="main-page-upper-container flex-row gap-16">
          <VideoPlayer />
          <Playlist />
        </div>
        <VideoDetails />
      </div>
    </div>
  );
}

export default App;
