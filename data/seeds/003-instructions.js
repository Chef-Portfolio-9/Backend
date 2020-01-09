exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('recipe_instructions')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('recipe_instructions').insert([
				{
					recipe_id: 1,
					step_number: 1,
					instruction:
						'Marinate Chickpeas for 24hours in 1/2 Cup Olive Oil, 1 T. Cumin, 1 T. Oregano, Dash of Salt and pepper, and 1 T. lemon Zest.'
				},
				{
					recipe_id: 1,
					step_number: 2,
					instruction:
						'Marinate Octopus in 1/2 Cup Olive Oil, 2 T. Sherry Vinegar, Dash of Salt and Pepper.'
				},
				{
					recipe_id: 1,
					step_number: 3,
					instruction: 'Warm 2oz Romesco sauce and spread  on plate.'
				},
				{
					recipe_id: 1,
					step_number: 4,
					instruction:
						'Strain and Saute Chickpeas on low for 6 min, then plate on top of Romesco.'
				},
				{
					recipe_id: 1,
					step_number: 5,
					instruction:
						'Flash Grill Octopus to texture, plate on top of Chickpeas.'
				},
				{
					recipe_id: 1,
					step_number: 6,
					instruction:
						'Garnish with 2 oz. of Pickled Pepper relish and a pinch of Maldon Sea Salt.'
				}
			]);
		});
};
