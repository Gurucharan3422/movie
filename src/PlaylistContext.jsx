import  { createContext, useState, useContext } from "react";

// Create PlaylistContext
export const PlaylistContext = createContext();

// PlaylistProvider to manage the state
export const PlaylistProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);

  const addToPlaylist = (movie) => {
    setPlaylist((prevPlaylist) => [...prevPlaylist, movie]);
  };

  return (
    <PlaylistContext.Provider value={{ playlist, addToPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

// Custom hook to use the context
export const usePlaylist = () => useContext(PlaylistContext);