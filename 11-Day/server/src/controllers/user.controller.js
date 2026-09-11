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

  let decoded;
  try {
    decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized token invalid or expire",
    });
  }

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

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const isUserExists = await userModel.findOne({ email });

  if (!isUserExists) {
    res.status(404).json({
      message: "something went wrong",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, isUserExists.password);

  if (!isPasswordValid) {
    res.status(404).json({
      message: "something went wrong",
    });
  }

  const { accessToken, refreshToken } = generateAccessRefreshToken(
    isUserExists._id,
  );

  isUserExists.refreshToken = refreshToken;
  await isUserExists.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    message: "User loginn suucessfully",
    data: {
      user: {
        name: isUserExists.name,
        email: isUserExists.email,
      },
      token: accessToken,
    },
  });
};

export const getAccessTokenViaRefreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(400).json({
      message: "refreshToken not found",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized token invalid or expire",
    });
  }

  const user = await userModel.findById(decoded.id);

  const { accessToken, newRefreshToken } = generateAccessRefreshToken(user._id);

  user.refreshToken = newRefreshToken;
  await user.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    message: "generate new access Token",
    data: {
      token: accessToken,
    },
  });
};

export default {
  registerController,
  getMeController,
  loginController,
  getAccessTokenViaRefreshToken,
};
