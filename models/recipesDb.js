const db = require('../data/dbConfig.js');
module.exports = {
get,
getById,
findRecipeInstructions,
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

function findRecipeInstructions(recipe_id) {
return db('recipes as r')
.select('r.recipe_name', 'i.step_number', 'i.instruction' )
.join('recipe_instructions as i', 'r.id', 'i.recipe_id' )
.orderBy('i.step_number')
.where('recipe_id', recipe_id)
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