const db = require('../../data/dbConfig');
module.exports = {
	get,
	getBy,
	add,
	findById
};

function get() {
	return db('users').select('id', 'username', 'password');
}

function getBy(username) {
	return db('users')
		.select('id', 'username', 'password')
		.where(username);
}

function add(user) {
	return db('users')
		.insert(user)
		.returning('id');
}

function findById(id) {
	return db('users')
		.select('id', 'username')
		.where({ id })
		.first();
}
