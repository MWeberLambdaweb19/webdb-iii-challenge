
exports.seed = function(knex, Promise) {
  return knex('cohorts').insert([
    {name: "Full Stack Web Development"},
    {name: "Android Development"},
    {name: "iOS Development"},
    {name: "Java Backend Development"},
    {name: "Data Science"},
    {name: "User Experience Design"}
  ]);
};
