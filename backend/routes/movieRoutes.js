const express = require("express");
const { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie } = require("../controllers/movieController");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware"); // Import the authentication middleware

// GET all movies (requires authentication)
router.get("/",  getAllMovies);

// GET a single movie by ID (requires authentication)
router.get("/:id", getMovieById);

// POST a new movie (requires authentication)
router.post("/", authenticateToken, addMovie);

// PUT update a movie (requires authentication)
router.put("/:id", authenticateToken, updateMovie);

// DELETE a movie (requires authentication)
router.delete("/:id", authenticateToken, deleteMovie);

module.exports = router;