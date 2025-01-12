const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const knex = require("./api/models/connection_db");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Code for connecting to the database
knex
  .raw("SELECT 1")
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

const userRouter = require("./api/routers/userRouter");
const categoryRouter = require("./api/routers/categoryRouter");

// Configuration of Routers.
app.use("/user", userRouter);
app.use("/category", categoryRouter);

//Header Settings
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "*");
    return res.status(200).json({});
  }

  next();
});

module.exports = app;
