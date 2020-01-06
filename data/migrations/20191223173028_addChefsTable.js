exports.up = function(knex) {
	return knex.schema.createTable('chefs', tbl => {
		tbl.increments();

		tbl
			.string('username', 255)
			.notNullable()
			.unique();
		tbl.string('password', 255).notNullable();
		tbl.string('full_name', 255).notNullable();
		tbl.string('location', 255).notNullable();
		tbl.string('restaurant', 255);
		tbl
			.integer('role_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('roles')
			.onDelete('RESTRICT')
			.onUpdate('CASCADE');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('chefs');
};
