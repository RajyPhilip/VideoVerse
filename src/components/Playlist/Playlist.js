import React, { useContext, useEffect, useState } from "react";
import "./Playlist.scss";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import { VideoPlayerContext } from "../Context/PlayListContext";

const Playlist = () => {
  const { videos, currentId, updateVideoTime } = useContext(VideoPlayerContext);
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(videos.findIndex((video) => video.id === currentId));
  }, [currentId, videos]);

  const handleSearchFile = (event) => {
    const searchText = event.target.value;
    updateVideoTime("search", searchText);
    setSearch(searchText);
  };

  const handleDragEnd = (result) => {
    updateVideoTime(
      "reorder",
      result.source.index,
      "",
      result.destination.index
    );
  };

  return (
    <div className="playlist-content box-border flex-column">
      <div className="playlist-upper-container flex-column gap-12 ">
        <div className="flex-1">
          <h1 className="playlist-title">Open-Letter</h1>
          <p className="playlist-sub-title ">
            your-playlist {""}
            <span className="playlist-length">
              - {index + 1}/{videos.length}
            </span>
          </p>
        </div>
        <div className="search-bar-container">
          <input
            className="py-8 px-28 search-input border-box xetgo-font-tag"
            onChange={handleSearchFile}
            placeholder="Search by name"
            value={search}
            id="playlist-file-search"
          />
          <img
            height={16}
            width={16}
            className="search-icon "
            src="https://d2k6zobmg5lufr.cloudfront.net/assets%2F20240214120334-search.svg"
            alt="search-icon"
          />
        </div>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="playlistDroppable">
          {(provided, snapshot) => (
            <div
              className="all-playlist-container flex-column "
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {videos.map((video, index) => (
                <div key={video.id}>
                  {video.show && (
                    <Draggable
                      key={video.id.toString()}
                      draggableId={video.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {video.show && (
                            <PlaylistCard
                              videoDetails={video}
                              index={index}
                              key={index}
                            />
                          )}
                        </div>
                      )}
                    </Draggable>
                  )}
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Playlist;
