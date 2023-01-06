const express = require("express");
const { v4: uuid } = require("uuid");
const app = express();
const port = 3000;

const users = [
  {
    id: "53bec65b-30bb-4b69-9fdf-971c198a9f32",
    name: "Paulo",
    city: "Campinas",
  },
  {
    id: "81d14792-1b99-4793-9fea-a66d37da3cb5",
    name: "Elon Musk",
    city: "Boca Chica",
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
  .route("/users")
  .get((req, res) => {
    const { city } = req.query;
    if (city) {
      const filteredUser = users.filter((user) =>
        user.city.toLowerCase().includes(city.toLowerCase())
      );
      if (filteredUser.length === 0) {
        return res.status(404).send({ message: "Users not found" });
      }
      return res.send(filteredUser);
    }
    res.send(users);
  })
  .post((req, res) => {
    try {
      const { name, city } = req.body;
      users.push({ id: uuid(), name, city });
      res.send({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message:
          "Oops, something went wrong... Ensure the data is correct and try to create the user again.",
      });
    }
  });

app
  .route("/users/:id")
  .get((req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  })
  .put((req, res) => {
    try {
      const { name, city } = req.body;
      const { id } = req.params;
      const userIndex = users.findIndex((user) => user.id === id);
      const userOldData = users[userIndex];
      users[userIndex] = {
        ...users[userIndex],
        name: name ?? userOldData.name,
        city: city ?? userOldData.city,
      };
      res.send({ message: "User updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message:
          "Oops, something went wrong... Ensure the data is correct and try to update the user again..",
      });
    }
  })
  .delete((req, res) => {
    try {
      const { id } = req.params;
      userIndex = users.findIndex((user) => user.id === id);
      if (userIndex < 0) {
        return res.status(404).send({ message: "User not found" });
      }
      users.splice(userIndex, 1);
      res.send({ message: "User deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message:
          "Oops, something went wrong... Ensure the data is correct and try to delete the user again..",
      });
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
