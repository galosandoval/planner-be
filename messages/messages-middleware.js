const Messages = require("./messages-model");
const Member = require("../user/member-model");

module.exports = {
  validateMessage,
  validateMessageId,
};

function validateMessageId(req, res, next) {
  const id = req.params.id;

  Messages.getById(id)
    .then((message) => {
      if (message) {
        req.message = message;
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
  const { member_id } = req.body;

  if (!member_id) {
    res.status(400).json({
      error:
        "Please provide all required fields: member_id",
    });
  } else {
    Member.findById(member_id)
      .then((user) => {
        if (user) {
          next();
        } else {
          res
            .status(404)
            .json({
              error: `User with id ${member_id} does not exist. Please provide a valid user id to post howto`,
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
}