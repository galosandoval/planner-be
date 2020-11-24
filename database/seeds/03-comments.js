exports.seed = function (knex) {
  const comments = [
    {
      plan_id: 1,
      user_id: 1,
      comment_desc: "Still working on this!",
    },
  ];
  return knex("comments").insert(comments);
};
