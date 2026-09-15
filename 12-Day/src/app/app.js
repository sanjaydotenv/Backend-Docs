import express from "express";
import urlRoute from "../routes/url.routes.js"

const app = express();

app.use(express.json());
app.use("/api/url" , urlRoute)


export default app;
