
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {recipe_name: 'Grilled Octopus with marinated Chickpeas, romesco, and a pickled pepper relish', chef_id: 2, meal_type: 'dinner'},
        {recipe_name: 'Fusilli with Crimini Mushrooms, Sundried Tomatoes, basil, arugula, and pine nuts', chef_id: 2, meal_type: 'dinner'},
        {recipe_name: 'Potato and Nduja Wood-Fired Pizza with Swiss Chard, bechemel, and garlic confit.', chef_id: 2, meal_type: 'dinner'}
      ]);
    });
};
