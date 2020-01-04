exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('instructions')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('instructions').insert([
				{
					instruction:
						'Marinate Chickpeas for 24hours in Olive Oil, Cumin, Oregano, Salt and pepper, and lemon Zest'
				},
				{
					instruction:
						'Marinate Octopus in Olive Oil, Sherry Vinegar, Salt and Pepper'
				},
				{ instruction: 'Warm Romesco sauce and spread 2oz on plate' },
				{
					instruction:
						'Strain and Saute Chickpeas on low for 6 min, then plate on top of Romesco'
				},
				{
					instruction:
						'Flash Grill Octopus to texture, plate on top of Chickpeas'
				},
				{
					instruction: 'Garnish with Pickled Pepper relish and Maldon Sea Salt'
				}
			]);
		});
};
