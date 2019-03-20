
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()//instead of delete we use truncate because truncate resets our index ,we can run our seeds and first thing will be id 1,2,3
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'leader'},//we delete id because truncate will auto set the ids
        {name: 'secretary'},
        { name: 'spokesperson'}
      ]);
    });
};
