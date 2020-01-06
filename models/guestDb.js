const db = require('../data/dbConfig.js');
module.exports = {
	get,
	getById,
	find,
	findBy
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
