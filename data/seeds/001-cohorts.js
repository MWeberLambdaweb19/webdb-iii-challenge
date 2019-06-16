
exports.seed = function(knex, Promise) {
  return knex('cohorts').insert([
    {cohort: "Full Stack Web Development"},
    {cohort: "Android Development"},
    {cohort: "iOS Development"},
    {cohort: "Java Backend Development"},
    {cohort: "Data Science"},
    {cohort: "User Experience Design"}
  ]);
};
