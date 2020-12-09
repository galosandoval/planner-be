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
    .select(
      "topic.id as topic_id",
      "topic.title"
    )
    .orderBy("topic.id");
}

function getById(id) {
  return db("topic")
    .select(
      "topic.id as topic_id",
      "topic.title"
    )
    .where({ "topic.id": id })
    .first();
}

function add(topic) {
  return db("topic")
    .insert(topic)
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
