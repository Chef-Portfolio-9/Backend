
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipe_detail').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('recipe_detail').insert([
        {recipe_id: 1 , quantity: .75 , measurement_unit: 'cup', ingredient_id: 38},
        {recipe_id: 1 , quantity: 1 , measurement_unit: 'cup', ingredient_id: 5 },
        {recipe_id: 1 , quantity: 1 , measurement_unit: 'T', ingredient_id: 15 },
        {recipe_id: 1 , quantity: 1 , measurement_unit: 'T', ingredient_id: 14 },
        {recipe_id: 1 , quantity: 1 , measurement_unit: 'T', ingredient_id: 17 },
        {recipe_id: 1 , quantity: .5 , measurement_unit: 'lb ', ingredient_id:  47},
        {recipe_id: 1 , quantity: 4 , measurement_unit: 'T', ingredient_id: 7 },
        {recipe_id: 1 , quantity: 2 , measurement_unit: 'oz', ingredient_id: 46 },
        {recipe_id: 1 , quantity: 1 , measurement_unit: 'small', ingredient_id: 29 },
        {recipe_id: 1 , quantity: 3 , measurement_unit: 'whole', ingredient_id: 31 },
      ]);
    });
};
