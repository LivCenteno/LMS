const express = require("express");
const categoryRouter = express();
const categoryController = require("../controllers/categoryController");

categoryRouter.post("/create", categoryController.insertCategory); //Create Another Category
categoryRouter.get("/view/all", categoryController.viewAllCategories); //Get All Categories
categoryRouter.put("/update/:id", categoryController.updateCategoryStatus); //Update Category Status

module.exports = categoryRouter;
