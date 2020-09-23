const { Schema, model, } = require("mongoose");


const MovieScheme = new Schema({
  title: { type: String, },
  releaseYear: { type: Number, },
  stars: [{ type: String, }],
  format: { type: String, },
});

const Movie = model("Movie", MovieScheme);

module.exports = Movie;
