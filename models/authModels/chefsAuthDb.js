const db = require('../../data/dbConfig');
module.exports = {
	getBy,
	add
};

function getBy(username) {
	return db('chefs')
		.select('id', 'username', 'password', 'full_name', 'location', 'restaurant')
		.where(username);
}

function add(user) {
	return db('chefs').insert(user, 'id');
}
