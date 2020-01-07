const db = require('../data/dbConfig.js');
module.exports = {
	get,
	getById,
	find,
	findBy,
	findRecipes
};

function get() {
	return db('recipes');
}

function getById(id) {
	return db('recipes')
		.where({ id })
		.first();
}

function find() {
	return db('chefs');
}

function findBy(id) {
	return db('chefs')
		.where({ id })
		.first();
}

function findRecipes(chef_id) {
	return db('chefs as c')
	.select('c.full_name', 'c.location', 'c.restaurant', 'r.recipe_name')
	.join('recipes as r', 'c.id', 'r.chef_id')
	.where('chef_id', chef_id)
}