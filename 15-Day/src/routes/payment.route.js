const express = require("express");
const productModel = require("../models/product.model.js");
const paymentModel = require("../models/payment.model.js");
const razorpayInstance = require("../config/razorpay.js");

const router = express.Router();

router.post("/:productId/order", async (req, res) => {
  const { productId } = req.params;

  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const order = await razorpayInstance.orders.create({
    amount: product.price.amount * 100,
    currency: product.price.currency,
    receipt: `order_rcptid_${productId}`,
    notes: {
      productId: productId,
      productTitle: product.title,
    },
  });

  const payment = (
    await paymentModel.create({
      orderId: order.id,
      productId: productId,
      amount: product.price.amount,
      currency: product.price.currency,
      status: "pending",
    })
  ).toObject();

  return res.status(201).json({ ...payment, keyId: razorpayInstance.key_id });
});

module.exports = router;
