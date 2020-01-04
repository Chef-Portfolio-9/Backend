exports.up = function(knex) {
	return knex.schema.createTable('instructions', tbl => {
		tbl.increments();
		
		tbl.string('instruction', 1000).notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('instructions');
};
