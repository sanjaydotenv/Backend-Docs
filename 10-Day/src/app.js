import express from "express";
import { userModel } from "./models/user.model.js";
import jwt from "jsonwebtoken";
import isAuthenticated from "./middlewares/auth.middleware.js";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/users/me", isAuthenticated, async (req, res) => {
  console.log("running");

  const user = req.forMe;

  console.log(user);

  res.send({
    message: "ok",
    user,
  });
});

app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name: username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, "secret");

  res.status(201).send({ user, token });
});

export default app;
