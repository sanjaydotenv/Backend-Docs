const dotenv = require("dotenv");
dotenv.config();

const _config = {
  RAZORPAY_KEY: process.env.RAZORPAY_KEY,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
};

module.exports = Object.freeze(_config);
