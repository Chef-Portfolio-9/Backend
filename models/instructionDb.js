const db = require('../data/dbConfig.js');
module.exports = {
get,
getById,
add,
update,
remove,
};

function get() {
return db('recipe_instructions');
}

function getById(id) {
return db('recipe_instructions')
.where({ id })
.first();
}

function add(post) {
return db('recipe_instructions')
.insert(post)
.then(ids => {
return getById(ids[0]);
});
}

function update(id, changes) {
return db('recipe_instructions')
.where({ id })
.update(changes);
}

function remove(id) {
return db('recipe_instructions')
.where('id', id)
.del();
}