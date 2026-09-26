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

/**
 * @method GET
 * @route /api/cart
 * @access protected
 * @description Get the user's cart
 */
route.get("/", authenticate, cartControllers.getAllCarts);

export default route;
