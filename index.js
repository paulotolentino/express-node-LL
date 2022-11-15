const express = require("express");
const { v4: uuid } = require("uuid");
const app = express();
const port = 3000;

const users = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  res.send(user);
});

app.post("/user", (req, res) => {
  try {
    const { name } = req.body;
    users.push({ id: uuid(), name });
    res.send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Oops, something went wrong... Ensure the data is correct and try to create the user again.",
    });
  }
});

app.put("/user/:id", (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    userIndex = users.findIndex((user) => user.id === id);

    users.push({ id: uuid(), name });
    res.send({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({
      message:
        "Oops, something went wrong... Ensure the data is correct and try to update the user again..",
    });
  }
});

app.delete("/user/:id", (req, res) => {
  try {
    const { id } = req.params;
    userIndex = users.findIndex((user) => user.id === id);
    if (userIndex < 0) {
      return res.status(404).send({ message: "User not found" });
    }
    users.splice(userIndex, 1);
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message:
        "Oops, something went wrong... Ensure the data is correct and try to delete the user again..",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
