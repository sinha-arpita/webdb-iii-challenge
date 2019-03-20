
// exports.up = function(knex, Promise) {
//    return knex.schema.createTable("students",table=>{

//         table.increments();
//         table.string('name',128)
//          .notNullable();
//          //we want a cohorts id cohort_id as foreign key
//          table.integer('cohort_id')
//           .unsigned()//means can't be negative ,useful as per the rules of diofferent databases
//           .references('id')//itis referencing "id" field in this table below
//           .inTable('cohorts')//line number 11 and 12 are together ,its saying this is a foreign key which is referencing the id field in cohorts table
//           .onDelete('CASCADE')
//           .onUpdate('CASCADE')

        
//     })
  
// };
exports.up = function(knex, Promise) {
    return knex.schema.createTable("students", tbl => {
      tbl.increments();
      tbl
        .string("name", 128)
        .notNullable()
   
      // foreign key
      tbl
        .integer("cohort_id")
        .unsigned()
        .references("id")
        .inTable("cohorts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
   };
   
   // remove table
   exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("students");
   };

exports.down = function(knex, Promise) {//rollback usees this function
  return knex.schema.dropTableIfExists('students')
};
