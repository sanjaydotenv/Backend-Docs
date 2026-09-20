import { Router } from "express";
import authcontrollers from "../controllers/auth.controllers.js";

const route = Router();

/**
 * @POST "http://localhost:3000/api/auth/register"
 * 
 */

route.post("/register", authcontrollers.userRegisterController);

export default route;
