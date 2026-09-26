import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { cartValidator } from "../validator/cart.validator";
import cartControllers from "../controllers/cart.controllers.js";

const route = Router();

/**
 * @method POST
 * @route /api/cart
 * @access protected
 * @description Add an product to the user's cart
 */

route.post("/", authenticate, cartValidator, cartControllers.addToCart);

export default route;
