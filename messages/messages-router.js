const router = require("express").Router();

const Messages = require("./messages-model");
const { validateMessage, validateMessageId } = require("./messages-middleware");
const requiresToken = require("../auth/restricted-middleware");

router.get("/", (req, res) => {
  Messages.getAll()
    .then((messages) => {
      res.status(200).json({ messages });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", validateMessageId, (req, res) => {
  res.status(200).json({ howto: req.message });
});

router.post("/", validateMessage, (req, res) => {
  const newMessage = req.body;

  Messages.add(newMessage)
    .then((newMessage) => {
      res.status(201).json({ newMessage: "newMessage created successfully", newMessage });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put(
  "/:id",
  requiresToken,
  validateMessageId,
  validateMessage,
  (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Messages.update(id, changes)
      .then((howto) => {
        res
          .status(200)
          .json({ message: `Howto with id ${id} successfully updated`, howto });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
);

router.delete("/:id", requiresToken, validateMessageId, (req, res) => {
  const id = req.params.id;

  Messages.remove(id)
    .then(() => {
      res.status(204)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;