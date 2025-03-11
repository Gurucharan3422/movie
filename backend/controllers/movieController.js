const Movie = require("../models/movieModel");

// Fetch all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    console.log("Received ID from frontend:", req.params.id); // Debugging

    if (!req.params.id) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new movie
exports.addMovie = async (req, res) => {
  try {
    console.log("Recieved Data:",req.body);
    const newMovie = new Movie(req.body);
    await newMovie.save();
    // const newMovie = new Movie(req.body);
    // await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update movie by ID
exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedMovie) return res.status(404).json({ message: "Movie not found" });
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete movie by ID
exports.deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};