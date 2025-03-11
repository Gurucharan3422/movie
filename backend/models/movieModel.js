const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  genre: [String],
  rating: Number,
  director: String,
  actors: [String], 
  plot: String,
  poster: String,
  trailerId: String,
  banner: String,
  runtime: Number,
  awards: String,
  country: String,
  language: String,
  boxOffice: String,
  production: String,
  website: String
});

const movieModel = mongoose.model("movies", movieSchema);

module.exports = movieModel;