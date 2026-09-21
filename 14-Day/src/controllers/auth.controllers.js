import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  createAccessToken,
  createRefreshToken,
  redRefreshToken,
} from "../utils/auth.utils.js";

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

  await userModel.findOneAndUpdate(user._id, {
    refreshToken,
  });

  res.cookie("refreshToken", refreshToken);

  res.status(201).json({
    message: "User register Successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    },
  });
};

const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  const isExists = await userModel.findOne({
    email,
  });

  if (!isExists) {
    return res.status(401).json({
      message: "invalid email or password",
    });
  }

  const isValidPassword = await bcrypt.compare(password, isExists.password);

  if (!isValidPassword) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const accessToken = createAccessToken({
    userID: isExists._id,
    role: isExists.role,
  });

  const refreshToken = createRefreshToken({
    userID: isExists._id,
    role: isExists.role,
  });

  await userModel.findByIdAndUpdate(isExists._id, {
    refreshToken,
  });

  res.cookie("refreshToken", refreshToken);

  res.status(200).json({
    message: "User login suucessfully",
    data: {
      user: {
        id: isExists._id,
        name: isExists.name,
        email: isExists.email,
        role: isExists.role,
      },
      accessToken,
    },
  });
};

const getNewAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const decoded = redRefreshToken(refreshToken);

  if (!decoded) {
    return res.status(400).json({
      message: "invalid refresh Token",
    });
  }

  const user = await userModel.findById(decoded.userID);

  if (user.refreshToken !== refreshToken) {
    userModel.findByIdAndUpdate(user._id, {
      refreshToken: null,
    });
  }

  const accessToken = createAccessToken({
    userId: user._id,
    role: user.role,
  });

  const newRefreshToken = createRefreshToken({
    userId: user._id,
    role: user.role,
  });

  await userModel.findByIdAndUpdate(user._id, {
    refreshToken: newRefreshToken,
  });

  res.cookie("refreshToken", newRefreshToken);

  res.status(201).json({
    message: "Create new Access Token",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    },
  });
};

export default {
  userRegisterController,
  userLoginController,
  getNewAccessToken,
};
