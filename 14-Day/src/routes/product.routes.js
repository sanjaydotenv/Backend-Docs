import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import productController from "../controllers/product.controller.js";
import { createProductValidator } from "../validator/product.validator.js";
import multer, { memoryStorage } from "multer";

const route = Router();

const upload = multer({
  storage: memoryStorage(),
});

/**
 * @method POST
 * @route /api/products/
 * @description creates the product and save its data into the DB, images will be store on imagekit.
 * @access seller
 * req.body=>{title,description:price:{amount,currency},sizes:[{size,stock},{si–ze,stock}]}
 */

route.post(
  "/",
  authenticate,
  (req, res, next) => {
    if (req.userProfile.role !== "seller") {
      return res.status(403).json({
        message: "user is not authorize to create product",
      });
    }
    next();
  },
  upload.array("images"),
  (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));
    next();
  },
  createProductValidator,
  productController.createProduct,
);

export default route;
