const db = require('../data/dbConfig.js');
module.exports = {
get,
getById,
findIngredients,
add,
update,
remove,
};

function get() {
return db('recipe_ingredients_detail');
}

function getById(id) {
return db('recipe_ingredients_detail')
.where({ id })
.first();
}

function findIngredients(recipe_id) {
return db('recipe_ingredients_detail as rid')
.select('rid.quantity', 'rid.measurement_unit', 'i.ingredient_name')
.join('ingredients as i', 'rid.ingredient_id', 'i.id')
.where('recipe_id', recipe_id)
}

function add(post) {
return db('recipe_ingredients_detail')
.insert(post, 'id')
.returning('id')
.then(ids => {
return getById(ids[0]);
});
}

function update(id, changes) {
return db('recipe_ingredients_detail')
.where({ id })
.update(changes, 'id');
}

function remove(id) {
return db('recipe_ingredients_detail')
.where('id', id)
.del();
}