exports.up = function(knex) {
	return knex.schema.createTable('users', tbl => {
		tbl.increments();

		tbl
			.string('username', 128)
			.unique()
			.notNullable();
		tbl.string('password', 128).notNullable();
		tbl
			.integer('role_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('roles')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
		tbl
			.integer('chef_id')
			.unsigned()
			.references('id')
			.inTable('chefs')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
		tbl
			.integer('recipe_id')
			.unsigned()
			.references('id')
			.inTable('recipes')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('users');
};
