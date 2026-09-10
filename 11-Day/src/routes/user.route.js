import express from "express";
import  userController from "../controllers/user.controller.js";

const route = express.Router();

route.post("/register", userController.registerController);

route.get("/me" , userController.getMeController)

export default route;
