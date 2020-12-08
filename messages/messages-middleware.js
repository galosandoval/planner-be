const Messages = require("./messages-model");
const Member = require("../user/member-model");

module.exports = {
  validateMessage,
  validateMessageId,
};

function validateMessageId(req, res, next) {
  const id = req.params.id;

  Messages.getById(id)
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

function validateMessage(req, res, next) {
  const { user_id, title, category, content } = req.body;

  if (!user_id || !title || !category || !content) {
    res.status(400).json({
      error:
        "Please provide all required fields: user_id, title, category, content",
    });
  } else {
    Member.findById(user_id)
      .then((user) => {
        if (user) {
          next();
        } else {
          res
            .status(404)
            .json({
              error: `User with id ${user_id} does not exist. Please provide a valid user id to post howto`,
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
}