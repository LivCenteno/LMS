const express = require("express");
const categoryRouter = express();
const categoryController = require("../controllers/categoryController");

categoryRouter.post("/create", categoryController.insertCategory);
module.exports = categoryRouter;
