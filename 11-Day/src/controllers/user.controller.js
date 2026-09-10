import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateAccessRefreshToken } from "../utils/auth.js";

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

export default {
  registerController,
};
