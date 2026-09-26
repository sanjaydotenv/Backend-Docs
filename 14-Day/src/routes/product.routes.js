import { Router } from "express";
import {
  authenticate,
  authenticateSeller,
} from "../middlewares/auth.middleware.js";
import productController from "../controllers/product.controller.js";
import {
  createProductValidator,
  listProductValidator,
  unlistProductValidator,
} from "../validator/product.validator.js";
import multer, { memoryStorage } from "multer";

const route = Router();

const upload = multer({
  storage: memoryStorage(),
  limits: {
    files: 5,
    fileSize: 1 * 1024 * 1024,
  },
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
  authenticateSeller,
  upload.array("images"),
  (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));
    next();
  },
  createProductValidator,
  productController.createProduct,
);

/**
 * @method GET
 * @route /api/product
 * @description Read all the published products from the DB
 * @access user
 */
route.get("/", authenticate, productController.listAllProducts);

/**
 * @method GET
 * @route /api/product/seller
 * @description Read all the products from the DB
 * @access seller
 */
route.get(
  "/seller",
  authenticate,
  authenticateSeller,
  productController.listAllProductsToSeller,
);

/**
 * @method PATCH
 * @route /api/products/unlist/:id
 * @description Unlist a product by its ID
 * @access seller
 */
route.patch(
  "/unlist/:productID",
  authenticate,
  authenticateSeller,
  unlistProductValidator,
  productController.unlistProduct,
);

/**
 * @method PATCH
 * @route /api/products/unlist/:id
 * @description list a product by its ID
 * @access seller
 */
route.patch(
  "/unlist/:productID",
  authenticate,
  authenticateSeller,
  listProductValidator,
  productController.listProduct,
);

export default route;
