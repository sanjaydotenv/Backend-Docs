import express from "express";
import userRoute from "../routes/user.route.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth/api/users", userRoute);

export default app;
