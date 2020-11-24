const router = require("express").Router();
const bcrypts = require("bcryptjs");
const userModel = require("./user-model");

const User = require("./user-model");

router.get("/", (req, res) => {
  User.find()
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
