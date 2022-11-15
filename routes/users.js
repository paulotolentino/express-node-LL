const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

const users = [];

router.get("/", (req, res) => {
  res.send(users);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  res.send(user);
});

router.post("", (req, res) => {
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports = router;
