import userModel from "../models/user.model.js";
import { readAccessToken } from "../utils/auth.utils.js";

export const authenticate = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  const decoded = readAccessToken(accessToken);

  console.log(decoded)

  if (!decoded) {
    return res.status(400).json({
      message: "invalid access token",
    });
  }

  const user = await userModel.findById(decoded.userID);

  req.userProfile = user;

  next();
};
