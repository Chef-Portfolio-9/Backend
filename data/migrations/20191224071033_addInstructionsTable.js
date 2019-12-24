exports.up = function(knex) {
	return knex.schema.createTable('instructions', tbl => {
		tbl.increments();

		tbl.integer('step_number').notNullable();
		tbl.string('instruction_step', 1000).notNullable();
		tbl
			.integer('recipe_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('recipes')
			.onUpdate('CASCADE')
			.onDelete('RESTRICT');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('instructions');
};
