import { Router } from "express";
import authcontrollers from "../controllers/auth.controllers.js";
import {
  loginValidator,
  registerValidator,
} from "../validator/auth.validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";

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
 * @POST "http://localhost:3000/api/auth/login"
 * @body const {email , password } = req.body
 */

route.post("/login", loginValidator, authcontrollers.userLoginController);

/**
 * @POST "http://localhost:3000/api/auth/refresh-token"
 * @cookies const refreshToken = req.cookies.refreshToken
 */

route.post("/refresh-token", authcontrollers.getNewAccessTokenController);

/**
 * @POST "http://localhost:3000/api/auth/getme"
 */

route.get("/getme", authenticate, authcontrollers.getMeController);

export default route;
