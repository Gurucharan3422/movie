const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");
const Movie = require("./models/movieModel");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debugging: Check if MONGO_URI is being read correctly
console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Default route to prevent "Cannot GET /"
app.get("/", async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch all movies from MongoDB
    res.json(movies); // Return movies as JSON response
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// Use authentication routes
app.use("/auth", authRoutes);

// Use movie routes
app.use("/movies", movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));