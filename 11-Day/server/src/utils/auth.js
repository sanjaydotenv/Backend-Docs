import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateAccessRefreshToken = (userID) => {
  if (!userID) {
    throw new Error("user ID is required");
  }

  const accessToken = jwt.sign({ id: userID }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ id: userID }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
