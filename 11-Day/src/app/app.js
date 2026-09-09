import express from "express";
import userRoute from "../routes/user.route.js";
const app = express();
app.use(express.json());


app.use("/auth/api/users" , userRoute)



export default app;
