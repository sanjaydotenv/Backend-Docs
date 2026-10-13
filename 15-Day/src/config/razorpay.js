const Razorpay = require("razorpay");
const _config = require("./config.js");

const razorpay = new Razorpay({
  key_id: _config.RAZORPAY_KEY,
  key_secret: _config.RAZORPAY_KEY_SECRET,
});

module.exports = razorpay;
