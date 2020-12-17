exports.seed = function (knex) {
  const members = [
    {
      id: 1,
      username: "gmoney",
      password: "password123",
      profile_picture:
        "https://media-exp1.licdn.com/dms/image/C5603AQFvOPmj64W34Q/profile-displayphoto-shrink_200_200/0?e=1613001600&v=beta&t=NwjKh16Dkgse8AbJRlBdrxUkM_4v3hxsoMJ8jGBgECE",
    },
  ];
  return knex("member")
    .insert(members)
    .then(() => console.log("\n== Seed data for member table added. ==\n"));
};
