exports.seed = function (knex) {
  const messages = [
    {
      id: 1,
      member_id: 1,
      description: "Hello World",
      topic_id: 1
    },
    {
      id: 2,
      member_id: 2,
      description: "Want to raid?",
      topic_id: 1
    },
  ];
  return knex("messages")
    .insert(messages)
    .then(() => console.log("\n== Seed data for messages table added. ==\n"));
};