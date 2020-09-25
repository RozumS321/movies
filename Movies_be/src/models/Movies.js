const { Schema, model } = require("mongoose");

const MovieScheme = new Schema({
  title: { type: String, required: true },
  releaseYear: { type: Number, min: 1850, max: 2020, required: true },
  stars: [{ type: String, required: true }],
  format: { type: String, required: true },
});

const Movie = model("Movie", MovieScheme);

module.exports = Movie;
