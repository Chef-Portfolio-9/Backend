const db = require('../../data/dbConfig');
module.exports = {
	get,
	getBy,
	add,
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

function getBy(username) {
	return db('chefs')
		.select('id', 'username', 'password', 'full_name', 'location', 'restaurant')
		.where(username);
}

function add(user) {
	return db('chefs').insert(user, 'id');
}


function update(id, changes) {
	return db('chefs')
		.where({ id })
		.update(changes);
}

function remove(id) {
	return db('chefs')
		.where('id', id)
		.del();
}
