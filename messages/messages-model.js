const db = require("../database/connection");

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};

function getAll() {
  return db("messages")
    .join("member", "member.id", "messages.member_id")
    .select(
      "messages.description"
    )
    .orderBy("messages.id");
}

function getById(id) {
  return db("messages")
    .join("member", "member.id", "messages.member_id")
    .select(
      "messages.description"
    )
    .where({ "messages.id": id })
    .first();
}

function add(howto) {
  return db("messages")
    .insert(howto)
    .returning("id")
    .then(([id]) => {
      return getById(id);
    });
}

function update(id, changes) {
  return db("messages")
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

  return db("messages")
    .where({ id })
    .del()
    .then(() => {
      return removedMessage;
    });
}