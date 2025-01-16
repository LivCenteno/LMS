const express = require("express");
const userRouter = express();
const userController = require("../controllers/userController");

userRouter.post("/create", userController.createUser); // Create New User
userRouter.get("/:id", userController.viewUserViaId); // View User Via Id
module.exports = userRouter;
