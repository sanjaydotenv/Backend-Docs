import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../utils/auth.utils.js";

const userRegisterController = async (req, res) => {
  const { name, email, password } = req.body;

  const isExists = await userModel.findOne({
    email,
  });

  if (isExists) {
    return res.status(401).json({
      message: "User is already exists with this email address",
      errors: [
        {
          path: "Email",
          msg: "User already exists with this email address",
        },
      ],
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: await bcrypt.hash(password, 12),
  });

  const accessToken = createAccessToken({
    userID: user._id,
    role: user.role,
  });
  const refreshToken = createRefreshToken({
    userID: user._id,
    role: user.role,
  });
};

export default {
  userRegisterController,
};
