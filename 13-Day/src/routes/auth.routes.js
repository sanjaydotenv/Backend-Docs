import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { validators } from "../validators/auth.validators.js";

const route = Router();

/**
 * @POST -> http://localhost:3000/api/auth/register
 */

route.post("/register", validators, authController.registerController);

export default route;
