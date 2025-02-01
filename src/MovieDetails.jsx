import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams(); // Get movie id from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `https://csa-batch79-react.onrender.com/movies/${id}`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to fetch movie details");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>No movie details available</div>;
  }

  return (
    <div className="movie-details">
      <h1>{movie.title} ({movie.year})</h1>
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      
      {/* Movie Details */}
      <p><strong>Genre:</strong> {movie.genre.join(", ")}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Actors:</strong> {movie.actors.join(", ")}</p>
      <p><strong>Awards:</strong> {movie.awards}</p>
      <p><strong>Country:</strong> {movie.country}</p>
      <p><strong>Language:</strong> {movie.language}</p>
      <p><strong>Box Office:</strong> {movie.boxOffice}</p>
      <p><strong>Production:</strong> {movie.production}</p>
      <p><strong>Website:</strong> <a href={movie.website} target="_blank" rel="noopener noreferrer">Visit Official Website</a></p>

      <h3>Plot:</h3>
      <p>{movie.plot}</p>

      {/* Display trailer iframe if available */}
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
    </div>
  );
};

export default MovieDetails;