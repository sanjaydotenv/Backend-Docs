const express = require("express");

const app = express();

app.use(express.json());

let users = [];

// Data Read It
app.get("/", (req, res) => {
  res.send({
    message: "Fetched",
    users,
  });
});

// Create Data
app.post("/create", (req, res) => {
  const { body } = req;

  users.push(body);
  res.send({
    message: "Created",
    users,
  });
});

// Update Data
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { Name } = req.body;

  const updatedUsers = users.map((user) =>
    user.id === id ? { ...user, Name } : user,
  );

  users = updatedUsers;

  res.send({
    message: "Updated",
    users,
  });
});

// Delete All Data
app.delete("/delete", (req, res) => {
  users = [];

  res.send({
    message: "All Data Deleted",
    users,
  });
});

// Delete Specific User
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const deletedUsers = users.filter((user) => user.id !== id);

  users = deletedUsers;

  res.send({
    message: `Deleted user id is ${id}`,
    users,
  });
});

app.listen(3000, () => {
  console.log("Server is running");
});
