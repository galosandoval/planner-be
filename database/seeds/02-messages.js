exports.seed = function (knex) {
  const messages = [
    {
      id: 1,
      member_id: 1,
      description: "Welcome to my ChatApp",
      topic_id: 1,
    },
  ];
  return knex("messages")
    .insert(messages)
    .then(() => console.log("\n== Seed data for messages table added. ==\n"));
};
