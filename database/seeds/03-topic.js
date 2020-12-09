exports.seed = function (knex) {
  const topic = [
    {title: "General"}
  ];
  return knex("topic")
    .insert(topic)
    .then(() => console.log("\n== Seed data for topic table added. ==\n"));
};