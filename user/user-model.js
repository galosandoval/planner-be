const db = require("../database/connection")

module.exports = {
  find
}

function find() {
  return db("user").orderBy("id")
}