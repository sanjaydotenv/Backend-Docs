import express from "express";
import { userModel } from "./models/user.model.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/users/me", async (req, res) => {

    
    
});

app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.create({ name: username, email, password });

  res.status(201).send(user);
});

export default app;
