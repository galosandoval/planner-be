exports.seed = function (knex) {
  const plans = [
    {
      user_id: 1,
      plan_desc: "Work on UI",
      completed: false,
      priority_status: "high",
    },
  ];
  return knex("plan").insert(plans);
};
