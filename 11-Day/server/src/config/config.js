import dotenv from "dotenv";
dotenv.config();

export const config = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/myapp",
  PORT: process.env.PORT || 3000,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};
