const express = require("express");

const usersRoutes = require("./routes/users");
const app = express();
const port = 3000;

const logProp = (propName, prop) => {
  if (Object.values(prop).length) {
    console.log(`${propName}: ${JSON.stringify(prop)}`);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("middleware 1");
  if (req.originalUrl === "/") {
    return res.send({ message: "This route does not exist" });
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
