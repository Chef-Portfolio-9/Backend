const db = require('../../data/dbConfig');
module.exports = {
	getBy,
	add
};


function getBy(username) {
	return db('users')
		.select('id', 'username', 'password')
		.where(username);
}

function add(user) {
	return db('users')
		.insert(user, 'id');
}


