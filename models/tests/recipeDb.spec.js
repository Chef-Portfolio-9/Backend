const Recipes = require('../recipesDb');

const db = require('../../data/dbConfig');

describe('recipeDb', () => {
	beforeEach(async () => {
		await db('recipes').truncate();
	});
	describe('get', () => {
		it('returns what has been added to the db', async () => {
			const dishes = [
				{
					recipe_name: 'Grilled Octopus with Chickpeas',
					chef_id: 2,
					meal_type: 'Dinner'
				},
				{
					recipe_name: 'Blueberry Ricotta Pancakes',
					chef_id: 3,
					meal_type: 'Breakfast'
				}
            ];
            await Recipes.add({
                recipe_name: 'Grilled Octopus with Chickpeas',
                chef_id: 2,
                meal_type: 'Dinner'
            })
            await Recipes.add({
                recipe_name: 'Blueberry Ricotta Pancakes',
                chef_id: 3,
                meal_type: 'Breakfast'
            })
            await Recipes.get()
            const meals = await('recipes')
            expect(meals).toBe(dishes)
		});
	});
});
