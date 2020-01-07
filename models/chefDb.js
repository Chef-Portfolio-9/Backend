const db = require('../../data/dbConfig');
module.exports = {
	get,
	getById,
	update,
	remove
};

function get() {
	return db('chefs').select(
		'id',
		'username',
		'password',
		'full_name',
		'location',
		'restaurant'
	);
}

function getById(id) {
	return db('chefs')
	.where({ id })
	.first();
	}

function update(id, changes) {
	return db('chefs')
		.where({ id })
		.update(changes, "id");
}

function remove(id) {
	return db('chefs')
		.where('id', id)
		.del();
}
