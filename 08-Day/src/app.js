const express = require("express");
const route = require("../src/routes/post.route");

const app = express();
app.use(express.json());

app.use("/post", route);

module.exports = app;
