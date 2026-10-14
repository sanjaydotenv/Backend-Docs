const express = require("express")
const morgan = require("morgan")
const path = require("path")
const paymentRoutes = require("../routes/payment.route.js")

const app = express()

app.use(express.json())

app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})


app.use("/api/payments", paymentRoutes)

module.exports = app