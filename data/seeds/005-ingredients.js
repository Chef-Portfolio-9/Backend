exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('ingredients')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('ingredients').insert([
				{ ingredient_name: 'Salt' },
				{ ingredient_name: 'Pepper' },
				{ ingredient_name: 'UnSalted Butter' },
				{ ingredient_name: 'Cultured Butter' },
				{ ingredient_name: 'Olive Oil' },
				{ ingredient_name: 'Red Wine Vinegar' },
				{ ingredient_name: 'Sherry Vinegar' },
				{ ingredient_name: 'Basalmic Vinegar' },
				{ ingredient_name: 'Basil' },
				{ ingredient_name: 'Thyme' },
				{ ingredient_name: 'Rosemary' },
				{ ingredient_name: 'Tarragon' },
				{ ingredient_name: 'Sage' },
				{ ingredient_name: 'Eggs' },
				{ ingredient_name: 'Ap Flour' },
				{ ingredient_name: 'Semolina Flour' },
				{ ingredient_name: '00 FLour' },
				{ ingredient_name: 'Yeast' },
				{ ingredient_name: 'Sourdough Starter' },
				{ ingredient_name: 'Fusilli' },
				{ ingredient_name: 'Penne' },
				{ ingredient_name: 'Farfalle' },
				{ ingredient_name: 'Bell Pepper' },
				{ ingredient_name: 'Onion' },
				{ ingredient_name: 'Shallots' },
				{ ingredient_name: 'Garlic' },
				{ ingredient_name: 'Baby Bell Peppers' },
				{ ingredient_name: 'SunDried Tomatoes' },
				{ ingredient_name: 'Tomatoes' },
				{ ingredient_name: 'Broccoli' },
				{ ingredient_name: 'Romanesco' },
				{ ingredient_name: 'Crimini Mushrooms' },
				{ ingredient_name: 'Fingerling Potatoes' },
				{ ingredient_name: 'Kale' },
				{ ingredient_name: 'Arugula' },
				{ ingredient_name: 'Spinach' },
				{ ingredient_name: 'Swiss Chard' },
				{ ingredient_name: 'Chickpeas' },
				{ ingredient_name: 'Cannellini Beans' },
				{ ingredient_name: 'Black Beans' },
				{ ingredient_name: 'Pine Nuts' },
				{ ingredient_name: 'Romesco' },
				{ ingredient_name: 'Octopus' },
				{ ingredient_name: 'Nduja' },
				{ ingredient_name: 'Latin Chorizo' },
				{ ingredient_name: 'Homemade Chicken Broth' }
			]);
		});
};
