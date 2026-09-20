import { Router } from "express";
import authcontrollers from "../controllers/auth.controllers.js";
import { registerValidator } from "../validator/auth.validator.js";

const route = Router();

/**
 * @POST "http://localhost:3000/api/auth/register"
 *
 */

route.post(
  "/register",
  registerValidator,
  authcontrollers.userRegisterController,
);

export default route;
