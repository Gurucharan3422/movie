import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  console.log("Movie ID from URL:", id);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid movie ID");
      setLoading(false);
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        const API_URL = `https://movie-qp7k.onrender.com/movies/${id}`;
        console.log("Fetching Movie from:", API_URL);

        // Get token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Access Denied: No Token Provided");
        }

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Attach token
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Movie Data:", data);

        setMovie(data);
        setLoading(false);
      } catch (err) {
        console.error("Error Fetching Movie:", err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddToPlaylist = () => {
    let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
    if (!playlist.some((m) => m._id === movie._id)) {
      playlist.push(movie);
      localStorage.setItem("playlist", JSON.stringify(playlist));
      alert(`${movie.title} added to playlist!`);
    } else {
      alert("Movie already in playlist.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie details available</div>;

  return (
    <div className="movie-details">
      <h1>{movie.title} ({movie.year})</h1>
      <img src={movie.poster} alt={movie.title} className="movie-poster" />

      <p><strong>Genre:</strong> {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Actors:</strong> {Array.isArray(movie.actors) ? movie.actors.join(", ") : movie.actors}</p>
      <p><strong>Awards:</strong> {movie.awards}</p>
      <p><strong>Country:</strong> {movie.country}</p>
      <p><strong>Language:</strong> {movie.language}</p>
      <p><strong>Box Office:</strong> {movie.boxOffice}</p>
      <p><strong>Production:</strong> {movie.production}</p>
      <p><strong>Website:</strong> <a href={movie.website} target="_blank" rel="noopener noreferrer">Visit Official Website</a></p>

      <h3>Plot:</h3>
      <p>{movie.plot}</p>

      {movie.trailerId && (
        <div className="movie-trailer">
          <h3>Watch Trailer</h3>
          <iframe
            width="300"
            height="315"
            src={`https://www.youtube.com/embed/${movie.trailerId}`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <button onClick={handleAddToPlaylist}>Add to Playlist</button>
    </div>
  );
};

export default MovieDetails;