const db = require("../database/connection");

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};

function getAll() {
  return db("topic")
    .join("messages", "messages.topic_id", "topic.id")
    .select(
      "topic.id as topic_id",
      "topic.title",
      "messages.id as message_id",
      "messages.description"
    )
    .orderBy("topic.id");
}

function getById(id) {
  return db("topic")
    .join("member", "member.id", "topic.member_id")
    .select("topic.member_id", "topic.titl")
    .where({ "topic.id": id })
    .first();
}

function add(howto) {
  return db("topic")
    .insert(howto)
    .returning("id")
    .then(([id]) => {
      return getById(id);
    });
}

function update(id, changes) {
  return db("topic")
    .where({ id })
    .update(changes)
    .then(() => {
      return getById(id);
    });
}

function remove(id) {
  let removedMessage = null;

  getById(id).then((message) => {
    removedMessage = message;
  });

  return db("topic")
    .where({ id })
    .del()
    .then(() => {
      return removedMessage;
    });
}
