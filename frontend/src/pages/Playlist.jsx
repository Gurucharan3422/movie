import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Movies.css"; // Ensure you are using the same CSS to keep consistency

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [removedMovies, setRemovedMovies] = useState([]); // Track removed movies

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem("playlist")) || [];
    setPlaylist(storedPlaylist);
  }, []);

  const removeFromPlaylist = (index) => {
    const storedPlaylist = JSON.parse(localStorage.getItem("playlist")) || [];
    storedPlaylist.splice(index, 1); // Remove the movie at the specified index
    localStorage.setItem("playlist", JSON.stringify(storedPlaylist)); // Update localStorage
    setPlaylist(storedPlaylist); // Update state
    setRemovedMovies((prev) => [...prev, index]); // Track removed movie
  };

  return (
    <div className="new">
      <h1>Your Playlist</h1>
      {playlist.length > 0 ? (
        <div className="movies-container">
          {playlist.map((movie, index) => (
            <div key={index} className="movie-card">
              <img
                src={movie.poster}
                alt={movie.title}
                className="movie-image"
              />
              <h2>{movie.title}</h2>
              <p>{movie.plot}</p>

              <Link to={`/movie/${movie.id}`} className="details-link">
                View Details
              </Link>

              <button
                className={`remove-from-playlist-button ${
                  removedMovies.includes(index) ? "removed" : ""
                }`}
                onClick={() => removeFromPlaylist(index)}
              >
                {removedMovies.includes(index)
                  ? "Removed"
                  : "Remove from Playlist"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>Your playlist is empty!</div>
      )}
    </div>
  );
};

export default Playlist;