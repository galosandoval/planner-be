const Topic = require("./topic-model");
const Member = require("../user/member-model");

module.exports = {
  validateTopic,
  validateTopicId,
};

function validateTopicId(req, res, next) {
  const id = req.params.id;

  Topic.getById(id)
    .then((Message) => {
      if (Message) {
        req.Message = Message;
        next();
      } else {
        res.status(404).json({ error: `Message with id ${id} does not exist` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

function validateTopic(req, res, next) {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({
      error:
        "Please provide all required fields: title",
    });
  } else {
    Member.findById(title)
      .then((user) => {
        if (user) {
          next();
        } else {
          res
            .status(404)
            .json({
              error: `User with id ${title} does not exist. Please provide a valid user id to post howto`,
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
}