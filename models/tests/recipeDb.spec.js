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
                    id: 1,
					recipe_name: 'Grilled Octopus with Chickpeas',
					chef_id: 2
					
				},
				{
                    id: 2,
					recipe_name: 'Blueberry Ricotta Pancakes',
					chef_id: 3,
					
				}
            ];
            await Recipes.add({
                recipe_name: 'Grilled Octopus with Chickpeas',
                chef_id: 2,
                
            })
            await Recipes.add({
                recipe_name: 'Blueberry Ricotta Pancakes',
                chef_id: 3
            })
            await Recipes.get()
            const meals = await db('recipes')
            expect(meals).toEqual(dishes)
		});
	});
});
