const db = require("../database/connection");

module.exports = {
  add,
  find,
  findBy,
  findById,
  loginIsValid,
  registerIsValid,
  remove,
  update,
  findMemberMessages,
};

function add(member) {
  return db("member")
    .insert(member, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function find() {
  return db("member").orderBy("id");
}

function findBy(filter) {
  return db("member").where(filter).orderBy("id");
}

function findById(id) {
  return db("member").where({ id }).first();
}

function loginIsValid(member) {
  return Boolean(
    (member.username && member.password && typeof member.password === "string") ||
      (member.password && typeof member.password === "string")
  );
}

function registerIsValid(member) {
  return Boolean(
    member.username &&
      member.password &&
      typeof member.password === "string"
  );
}

function remove(id) {
  return db("member").where("id", id).del();
}

function update(id, change) {
  return db("member").where("id", id).update(change);
}

function findMemberMessages(id) {
  return db("member")
    .join("messages", "messages.member_id", "member.id")
    .select("member.username", "messages.description")
    .where("member.id", id);
}