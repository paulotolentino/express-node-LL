const express = require("express");

const usersRoutes = require("./routes/users");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("middleware 1");
  if (req.originalUrl === "/") {
    return res.status(404).send({ message: "This route does not exist" });
  }
  next();
});

app.use((req, res, next) => {
  console.log("middleware 2");

  next();
});

app.use((req, res, next) => {
  console.log("middleware 3");

  next();
});

app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
