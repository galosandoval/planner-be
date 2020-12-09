exports.up = function (knex) {
  return knex.schema
    .createTable("member", (tbl) => {
      tbl.increments();

      tbl.string("username", 128).unique().notNullable();

      tbl.string("password", 128).notNullable();

      tbl.string("profile_picture", 300);
    })

    .createTable("topic", (tbl) => {
      tbl.increments();

      tbl.string("title", 20).notNullable();
    })

    .createTable("messages", (tbl) => {
      tbl.increments();

      tbl.string("description", 300).notNullable();

      tbl
        .integer("member_id")
        .unsigned()
        .notNullable()
        .references("member.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .integer("topic_id")
        .unsigned()
        .notNullable()
        .references("topic.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("mesages")
    .dropTableIfExists("topic")
    .dropTableIfExists("member");
};
