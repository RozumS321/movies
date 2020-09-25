const express = require("express");
const router = require("./src/router");
const config = require("config");
const models = require("./src/models");
const {
  MONGO_DB_URI,
  MONGO_DB_NAME,
  PORT,
  HOST,
} = require("./config/default.json")

async function main() {
  const app = express();

  try {
    await models.connect(MONGO_DB_URI, MONGO_DB_NAME);
    app.use(express.json());

    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, cache-control, pragma, Authorization"
      );

      next();
    });
    app.use("/api", router);

    app.listen(PORT, HOST, (req, res) => {
      console.log(`server has been started on port: ${PORT}`);
    });

  } catch (e) {
    console.log("Server eror: " + e.message);
    process.exit(1);
  }
}
main();
