const router = require("express").Router();

const Topic = require("./topic-model");
const { validateTopic, validateTopicId } = require("./topic-middleware");
const requiresToken = require("../auth/restricted-middleware");

router.get("/", (req, res) => {
  Topic.getAll()
    .then((topic) => {
      res.status(200).json({ topic });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", validateTopic, (req, res) => {
  res.status(200).json({ topic: req.topic });
});

router.post("/", requiresToken, (req, res) => {
  const topic = req.body;

  Topic.add(topic)
    .then((topic) => {
      res.status(201).json({ message: "topic created successfully", topic });
    })
    .catch((err) => {
      console.log(res)
      res.status(500).json({ error: err.message });
    });
});

router.put(
  "/:id",
  requiresToken,
  validateTopicId,
  validateTopic,
  (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Topic.update(id, changes)
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

router.delete("/:id", requiresToken, validateTopicId, (req, res) => {
  const id = req.params.id;

  Topic.remove(id)
    .then(() => {
      res.status(204);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
