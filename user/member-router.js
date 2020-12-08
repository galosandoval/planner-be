const router = require("express").Router();

const { validateMember, validateMemberId } = require('./member-middleware')
const Member = require("./member-model");

router.get("/", (req, res) => {
  Member.find()
    .then((members) => {
      res.status(200).json({ members });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});
router.get("/:id", validateMemberId, (req, res) => {
  const id = req.params.id;
  Member.findById(id)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get('/:id/messages', (req,res)=>{
  const id = req.params.id
  Member.findMemberMessages(id).then(memberMessages =>{
    res.status(200).json({memberMessages})
  })
})

router.put("/:id", validateMemberId, validateMember, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const password = req.body.password;

  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcryptjs.hashSync(password, rounds);

  Member.update(id, { ...changes, password: hash })
    .then((Member) => {
      res
        .status(200)
        .json({ message: `Member with the id ${id} was successfully changed` });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", validateMemberId, (req, res) => {
  const id = req.params.id;

  Member.remove(id)
    .then((deleted) => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});


module.exports = router;
