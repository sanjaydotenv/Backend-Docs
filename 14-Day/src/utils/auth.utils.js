import jwt, { decode } from "jsonwebtoken";
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

export const readRefreshToken = (refreshToken) => {
  try {
    if (!refreshToken) {
      console.log("Refresh token not found");
      return;
    }

    console.log("running", config.REFRESH_TOKEN_SECRET);
    const decoded = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);

    return decoded;
  } catch (error) {
    console.log("Refresh token verify error:", error.message);
    return;
  }
};

export const readAccessToken = (accessToken) => {
  try {
    if (!accessToken) {
      return res.status(400).json({
        message: "Access Token not found",
      });
    }

    const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    console.log("Refresh token verify error:", error.message);
    return;
  }
};
