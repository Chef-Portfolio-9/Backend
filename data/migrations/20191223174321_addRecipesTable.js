exports.up = function(knex) {
	return knex.schema.createTable('recipes', tbl => {
		tbl.increments();
		tbl.blob('recipe_img').notNullable();
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
			.onDelete('CASCADE');
		tbl.string('meal_type', 255).notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('recipes');
};
