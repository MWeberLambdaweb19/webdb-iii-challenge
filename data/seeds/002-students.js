
exports.seed = function(knex, Promise) {
  return knex('students').insert([
    {name: "Mack", cohort_id: "1"},
    {name: "Basil", cohort_id: "2"},
    {name: "Pete", cohort_id: "1"},
    {name: "Sydney", cohort_id: "4"},
    {name: "Chance", cohort_id: "5"},
    {name: "Tricia", cohort_id: "6"}
  ]);
};
