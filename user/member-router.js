const router = require("express").Router();
const bcrypts = require("bcryptjs");

const User = require("./member-model");

router.get("/", (req, res) => {
  User.find()
    .then((members) => {
      res.status(200).json({ members });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
