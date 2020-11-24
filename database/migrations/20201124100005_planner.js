exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments();

      table.string("username", 128).unique().notNullable();

      table.string("password", 128).notNullable();

      table.string("profile_picture", 128).nullable();
    })
    .createTable("plan", (table) => {
      table.increments();

      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      table.string("plan_desc", 300).notNullable();

      table.boolean("completed").notNullable();

      table.string("priority_status", 28).notNullable();
    })
    .createTable("comments", (table) => {
      table.increments();

      table
        .integer("plan_id")
        .unsigned()
        .notNullable()
        .references("plan.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      table.string("comment_desc", 300).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("comments")
    .dropTableIfExists("plan")
    .dropTableIfExists("user");
};
