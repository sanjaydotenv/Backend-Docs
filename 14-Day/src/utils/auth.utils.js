import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const createAccessToken = ({ userID, role }) => {
  const accessToken = jwt.sign(
    {
      userID,
      role,
    },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: "15Min" },
  );

  return accessToken;
};

export const createRefreshToken = ({ userID, role }) => {
  const refreshToken = jwt.sign(
    {
      userID,
      role,
    },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: "7Days" },
  );

  return refreshToken;
};
