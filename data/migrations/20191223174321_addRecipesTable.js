exports.up = function(knex) {
	return knex.schema.createTable('recipes', tbl => {
		tbl.increments();

		tbl
			.string('recipe_name', 255)
			.notNullable()
			.unique();
		tbl
			.integer('chef_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('chefs')
			.onUpdate('CASCADE')
			.onDelete('RESTRICT');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('recipes');
};
