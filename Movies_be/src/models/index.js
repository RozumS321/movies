const Movie = require("./Movies");
const mongoose = require("mongoose");

module.exports = {
  connect: (uri, dbName) =>
    mongoose.connect(`${uri}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  Movie,
};
