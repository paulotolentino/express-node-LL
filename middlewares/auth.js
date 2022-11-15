const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: "User not authorized to perform this request" });
  }
  next();
});

module.exports = router;
