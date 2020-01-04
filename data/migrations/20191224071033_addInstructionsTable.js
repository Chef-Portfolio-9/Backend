exports.up = function(knex) {
	return knex.schema.createTable('instructions', tbl => {
		tbl.increments();

		tbl
			.integer('recipe_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('recipes')
			.onDelete('RESTRICT')
			.onUpdate('CASCADE');
		tbl.integer('step_number').notNullable();
		tbl.string('instruction', 1000).notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('instructions');
};
