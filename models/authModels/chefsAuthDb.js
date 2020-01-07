const db = require('../../data/dbConfig');
module.exports = {
	get,
	getBy,
	add,
	findById
};

function get() {
	return db('chefs').select('id', 'username', 'password', 'full_name', 'location', 'restaurant');
}

function getBy(username) {
	return db('chefs')
		.select('id', 'username', 'password', 'full_name', 'location', 'restaurant')
		.where(username);
}

function add(user) {
	return db('chefs')
		.insert(user, 'id')
		.returning('id', 'username', 'password', 'full_name', 'location', 'restaurant')
}

function findById(id) {
	return db('chefs')
		.select('id', 'username')
		.where({ id })
		.first();
}

