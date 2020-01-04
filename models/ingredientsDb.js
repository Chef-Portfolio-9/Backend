const db = require('../data/dbConfig.js');
module.exports = {
get,
getById,
add,
update,
remove,
};

function get() {
return db('ingredients');
}

function getById(id) {
return db('ingredients')
.where({ id })
.first();
}

function add(post) {
return db('ingredients')
.insert(post)
.then(ids => {
return getById(ids[0]);
});
}

function update(id, changes) {
return db('ingredients')
.where({ id })
.update(changes);
}

function remove(id) {
return db('ingredients')
.where('id', id)
.del();
}