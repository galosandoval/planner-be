const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Member = require("../user/member-model");

router.post("/register", (req, res) => {
  const creds = req.body;

  if (Member.registerIsValid(creds)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcryptjs.hashSync(creds.password, rounds);

    creds.password = hash;

    Member.add(creds)
      .then((Member) => {
        const token = makeJwt(Member);

        res.status(201).json({ data: Member }); // if you want to log someone in after they register
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide your username, and password",
    });
  }
});

router.post("/login", (req, res) => {
  const creds = req.body;

  if (Member.loginIsValid(creds)) {
    if (creds.username) {
      // console.log("logging in by username");

      Member.findBy({ username: creds.username })
        .then(([member]) => {
          // compare the password the hash stored in the database
          if (member && bcryptjs.compareSync(creds.password, member.password)) {
            const token = makeJwt(member);

            res.status(200).json({ message: "Welcome to my chat app", token, username: member.username, id: member.id});
          } else {
            res.status(401).json({ message: "Invalid credentials" });
          }
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    }
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

function makeJwt(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    email: user.email,
  };

  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";

  const options = {
    expiresIn: "8h",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;