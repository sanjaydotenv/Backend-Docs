import productModel from "../models/product.model.js";
import cartModel from "../models/cart.model.js";

const addToCart = async (req, res) => {
  const { productId, quantity, size } = req.body;

  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  const selectedSize = product.sizes.find((s) => s.size === size);

  if (!selectedSize) {
    return res.status(400).json({
      message: "Invalid size",
    });
  }

  if (selectedSize.stock < quantity) {
    return res.status(400).json({
      message: "Insufficient stock",
    });
  }

  const cart =
    (await cartModel.findOne({ user: req.userProfile.userID })) ??
    (await cartModel.create({ user: req.user.userId }));

  const productInCart = cart.products.find(
    (p) => p.product.toString() === productId && p.size === size,
  );
  
};

export default { addToCart };
