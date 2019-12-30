const db = require('../../data/dbConfig');
module.exports = {
	get,
	getBy,
	add,
	findById
};

function get() {
	return db('chefs').select('id', 'username', 'password', 'location');
}

function getBy(username) {
	return db('chefs')
		.select('id', 'username', 'password', 'location', 'role_id')
		.where(username);
}

function add(user) {
	return db('chefs')
		.insert(user, 'id')
		.returning('id');
}

function findById(id) {
	return db('chefs')
		.select('id', 'username')
		.where({ id })
		.first();
}
