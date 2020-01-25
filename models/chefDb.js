const db = require('../data/dbConfig');
module.exports = {
	get,
	getById,
	add,
	findRecipes,
	update,
	remove
};

function get() {
	return db('chefs')
	// .select(
	// 	'id',
	// 	'username',
	// 	'password',
	// 	'full_name',
	// 	'location',
	// 	'restaurant'
	// )
	;
}

function getById(id) {
	return db('chefs')
		.where({ id })
		.first();
}
function add(post) {
	return db('chefs')
	.insert(post, 'id')
	.then(ids => {
	return getById(ids[0]);
	});
	}

function findRecipes(chef_id) {
	return db('chefs as c')
		.select('c.full_name', 'c.location', 'c.restaurant', 'r.recipe_name', 'r.id')
		.join('recipes as r', 'c.id', 'r.chef_id')
		.where('chef_id', chef_id);
}

function update(id, changes) {
	return db('chefs')
		.where({ id })
		.update(changes, 'id');
}

function remove(id) {
	return db('chefs')
		.where('id', id)
		.del();
}
