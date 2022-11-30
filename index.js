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
  const { method, body, query, originalUrl } = req;
  console.log(`INFO: ${method} ${originalUrl}`);
  logProp("body", body);
  logProp("query", query);

  next();
});

app.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "User not authorized to perform this request" });
  }

  next();
});

app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
