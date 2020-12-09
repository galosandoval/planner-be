const router = require("express").Router();

const Topic = require("./topic-model");
// const { validateMessage, validateMessageId } = require("./messages-middleware");
const requiresToken = require("../auth/restricted-middleware");

router.get("/", (req, res) => {
  Topic.getAll()
    .then((Topic) => {
      res.status(200).json({ Topic });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// router.get("/:id", validateMessageId, (req, res) => {
//   res.status(200).json({ howto: req.howto });
// });

// router.post("/", requiresToken, validateMessage, (req, res) => {
//   const howto = req.body;

//   Topic.add(howto)
//     .then((howto) => {
//       res.status(201).json({ message: "Howto created successfully", howto });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });

// router.put(
//   "/:id",
//   requiresToken,
//   validateMessageId,
//   validateMessage,
//   (req, res) => {
//     const id = req.params.id;
//     const changes = req.body;

//     Topic.update(id, changes)
//       .then((howto) => {
//         res
//           .status(200)
//           .json({ message: `Howto with id ${id} successfully updated`, howto });
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err.message });
//       });
//   }
// );

// router.delete("/:id", requiresToken, validateMessageId, (req, res) => {
//   const id = req.params.id;

//   Topic.remove(id)
//     .then(() => {
//       res.status(204);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });

module.exports = router;
