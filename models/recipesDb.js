const db = require('../data/dbConfig.js');
module.exports = {
get,
getById,
add,
update,
remove,
};

function get() {
return db('recipes');
}

function getById(id) {
return db('recipes')
.where({ id })
.first();
}

function add(post) {
return db('recipes')
.insert(post)
.then(ids => {
return getById(ids[0]);
});
}

function update(id, changes) {
return db('recipes')
.where({ id })
.update(changes);
}

function remove(id) {
return db('recipes')
.where('id', id)
.del();
}