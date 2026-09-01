import express from "express";

import { userModel } from "./models/user.model.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "This is a get api",
  });
});

app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  const createdUser = await userModel.create({
    name,
    email,
    password,
  });

  const token = await jwt.sign(
    {
      email,
      _id: createdUser._id,
    },
    "uwfekwjekjfwekjkjfwekjhkhjfwe",
  );

  return res.status(201).json({
    message: "user created successfully",
    createdUser,
    token,
  });
});

export default app;
