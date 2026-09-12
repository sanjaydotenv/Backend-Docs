import express from "express";
import userRoute from "../routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/auth/api/users", userRoute);

export default app;
