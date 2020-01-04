exports.up = function(knex) {
	return knex.schema.createTable('recipe_detail', tbl => {
		tbl.increments();
		tbl
			.integer('recipe_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('recipes')
			.onDelete('RESTRICT')
			.onUpdate('CASCADE');
			
		tbl.float('quantity', 255).notNullable();
		tbl.string('measurement_unit', 255).notNullable();

		tbl
			.integer('ingredient_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('ingredients')
			.onDelete('RESTRICT')
			.onUpdate('CASCADE');
		
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('recipe_detail');
};
