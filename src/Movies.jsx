import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedMovies, setAddedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state

  const API_URL = "https://csa-batch79-react.onrender.com/movies";

  const addtoPlaylist = (movie) => {
    const playlist = JSON.parse(localStorage.getItem("playlist")) || [];

    if (!playlist.some((item) => item.id === movie.id)) {
      playlist.push(movie);
      localStorage.setItem("playlist", JSON.stringify(playlist));
      setAddedMovies((prev) => [...prev, movie.id]);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // 🔍 Filter movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="new">
      <h1>Movies</h1>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="movies-container">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.poster} alt={movie.title} className="movie-image" />
              <h2>{movie.title}</h2>
              <p>{movie.plot}</p>

              <Link to={`/movie/${movie.id}`} className="details-link">
                View Details
              </Link>

              <button
                onClick={() => addtoPlaylist(movie)}
                className={`add-to-playlist-button ${addedMovies.includes(movie.id) ? "added" : ""}`}
                disabled={addedMovies.includes(movie.id)}
              >
                {addedMovies.includes(movie.id) ? "Added to Playlist" : "Add to Playlist"}
              </button>
            </div>
          ))
        ) : (
          <div>No movies found</div>
        )}
      </div>
    </div>
  );
};


export default Movies;