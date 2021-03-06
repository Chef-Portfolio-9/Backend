exports.up = function(knex) {
	return knex.schema.createTable('recipe_ingredients_detail', tbl => {
		tbl.increments();
		tbl
			.integer('recipe_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('recipes')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
			
		tbl.float('quantity', 255).notNullable();
		tbl.string('measurement_unit', 255).notNullable();

		tbl
			.integer('ingredient_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('ingredients')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
		
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('recipe_ingredients_detail');
};
