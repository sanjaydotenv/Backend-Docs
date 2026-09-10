import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateAccessRefreshToken } from "../utils/auth.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(400).json({
      message: "user already exists",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: await bcrypt.hash(password, 12),
  });

  const { accessToken, refreshToken } = generateAccessRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
    })
    .status(201)
    .json({
      message: "Registerd Successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
        accessToken: accessToken,
      },
    });
};

export const getMeController = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];


  if (!token) {
    return res.status(404).json({
      message: "Unauthorized bad request",
    });
  }

  const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

  const user = await userModel.findById(decoded.id);

  res.status(200).json({
    message: "user fetched suucessfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
    },
  });
};

export default {
  registerController,
  getMeController,
};
