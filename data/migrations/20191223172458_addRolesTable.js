
exports.up = function(knex) {
  return knex.schema.createTable('roles', tbl => {
      tbl.increments();

      tbl.string('role_name', 128).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('roles')
};
