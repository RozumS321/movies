const { Router } = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = Router();
const fs = require("fs");
const {
  Types: { ObjectId },
} = require("mongoose");
const Movie = require("./models/Movies");

router.post("/movie/add/", async (req, res) => {
  const { movieInfo } = req.body;
  const prevMovie = await Movie.findOne({ title: movieInfo.title, releaseYear: movieInfo.releaseYear, format: movieInfo.format });
  if (prevMovie && prevMovie.stars.length === movieInfo.stars.length && prevMovie.stars.every((star) => movieInfo.stars.find((s) => s === star))) {
    res.json({ error: 'Not unique' });
    return;
  }


  const movie = await Movie.create({ ...movieInfo });
  res.json({ movie });
});

router.get("/movie/", async (req, res) => {
  const starSearch = req.query.stars;
  const titleSearch = req.query.title;

  const sort = req.query.sort === "ASC" ? 1 : -1;
  const query = {};
  if (starSearch) {
    query.stars = { $regex: starSearch, $options: "i" };
  }
  if (titleSearch) {
    query.title = { $regex: titleSearch, $options: "i" };
  }

  const movies = await Movie.find(query).sort({ title: sort });
  res.json({ movies });
});

router.delete("/movie/:id", async (req, res) => {
  const { id } = req.params;
  const movies = await Movie.deleteOne({ _id: ObjectId(id) });
  res.json({ movies });
});

router.post("/movie/upload/", upload.single("txtFile"), async (req, res) => {
  const { file } = req;
  const fileText = await new Promise((res, rej) => {
    fs.readFile(file.path, (err, data) => {
      if (err) {
        rej(err);
      }
      res(data.toString());
    });
  });

  const fileData = fileText.split("\n");

  const movies = [{}];
  let fileCount = 0;
  for (let i = 0; i < fileData.length; i++) {
    if (fileData[i] === "") {
      fileCount += 1;
      movies[fileCount] = {};
    } else if (movies[fileCount]) {
      if (fileData[i].startsWith("Title:")) {
        const title = fileData[i].split("Title:")[1].trim();
        movies[fileCount].title = title;
        continue;
      }
      if (fileData[i].startsWith("Release Year:")) {
        const releaseYear = fileData[i].split("Release Year:")[1].trim();
        movies[fileCount].releaseYear = +releaseYear;
        continue;
      }
      if (fileData[i].startsWith("Format:")) {
        const format = fileData[i].split("Format:")[1].trim();
        movies[fileCount].format = format;
        continue;
      }
      if (fileData[i].startsWith("Stars:")) {
        const stars = fileData[i].split("Stars:")[1].trim();
        const starsArr = stars.split(",");
        movies[fileCount].stars = starsArr;
        continue;
      }
    }


  }

  const moviesToCreate = movies.filter(movie => movie.title);
  try {
    await Promise.all(moviesToCreate.map(async movie => {
      const prevMovie = await Movie.findOne({ title: movie.title, releaseYear: movie.releaseYear, format: movie.format });
      if (prevMovie && prevMovie.stars.length === movie.stars.length && prevMovie.stars.every((star) => movie.stars.find((s) => s === star))) {
        throw new Error('not unique')
      }
    }))
  }
  catch (e) {
    res.json({ error: 'Not unique' });
    return;
  }

  const movie = await Movie.create(moviesToCreate);
  console.log(movie)

  res.json({ movie });
});

module.exports = router;
