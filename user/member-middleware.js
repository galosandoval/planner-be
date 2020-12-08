const User = require("./member-model");

module.exports = {
  validateMemberId,
  validateMember,
};

function validateMemberId(req, res, next) {
  const id = req.params.id;
  User.findById(id)
    .then((member) => {
      console.log(member);
      if (member) {
        req.member = member;
        next();
      } else {
        res.status(404).json({ message: "invalid member id" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error 500!!!" });
    });
}

function validateMember(req, res, next) {
  const { username, password } = req.body;
  console.log(req.body.username);
  if (!username || !password) {
    res.status(400).json({ message: "missing username or password" });
  } else {
    next();
  }
}