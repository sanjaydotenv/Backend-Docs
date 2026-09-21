import { Router } from "express";
import authcontrollers from "../controllers/auth.controllers.js";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";

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

/**
 * @POST "hhtp://localhost:3000/api/auth/login"
 * @body const {email , password } = req.body
 */

route.post("/login", loginValidator ,authcontrollers.userLoginController)

export default route;
