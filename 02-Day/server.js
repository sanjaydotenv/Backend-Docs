const expree = require("express");

const app = expree();

app.use(expree.json());

app.get("/", (req, res) => {
  res.send("Hy i am server");
});

app.get("/home", (req, res) => {
  res.send("Hy i am home page");
});

app.post("/get-data", (req, res) => {
  console.log(req.body);
  res.send("backend");
});

app.listen(3000, () => {
  console.log("Servre is running on port no 3000");
});
