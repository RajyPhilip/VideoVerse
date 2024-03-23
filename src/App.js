import logo from "./logo.svg";
import "./App.scss";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import Playlist from "./components/Playlist/Playlist";
import VideoDetails from "./components/VideoDetails/VideoDetails";

function App() {
  return (
    <div className="main-page">
      <div className="main-page-content">
        <div className="main-page-upper-container">
          <VideoPlayer />
          <Playlist />
        </div>
        <VideoDetails />
      </div>
    </div>
  );
}

export default App;
