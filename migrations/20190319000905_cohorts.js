
exports.up = function(knex, Promise) {
   return knex.schema.createTable('cohorts',table=>{
        table.increments();
        table.string('name',128)
        .notNullable()//required
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts')
};
