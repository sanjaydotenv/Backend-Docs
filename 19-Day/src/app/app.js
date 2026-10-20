import express from "express"
import passport from "../config/passport.js"
import authRouter from "../routes/auth.routes.js"
const app = express()
app.use(passport.initialize())

app.use("/api/auth" , authRouter)

export default app