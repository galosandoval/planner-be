exports.seed = function (knex) {
  const users = [
    {
      username: "galosan",
      password: "password123",
      profile_picture:
        "https://avatars0.githubusercontent.com/u/65971577?s=400&u=fce469591a7f246b34c21a01e9737a1d695d5bfd&v=4",
    },
  ];
  return knex("user").insert(users);
};
