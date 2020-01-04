exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('instructions')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('instructions').insert([
				{
					step_number: 1,
					instruction:
						'Marinate Chickpeas for 24hours in Olive Oil, Cumin, Oregano, Salt and pepper, and lemon Zest'
				},
				{
					step_number: 2,
					instruction:
						'Marinate Octopus in Olive Oil, Sherry Vinegar, Salt and Pepper'
				},
				{
					step_number: 3,
					instruction: 'Warm Romesco sauce and spread 2oz on plate'
				},
				{
					step_number: 4,
					instruction:
						'Strain and Saute Chickpeas on low for 6 min, then plate on top of Romesco'
				},
				{
					step_number: 5,
					instruction:
						'Flash Grill Octopus to texture, plate on top of Chickpeas'
				},
				{
					step_number: 6,
					instruction: 'Garnish with Pickled Pepper relish and Maldon Sea Salt'
				}
			]);
		});
};
