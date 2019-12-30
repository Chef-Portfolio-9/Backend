const router = require('express').Router();

//Pull in knex helper models
const recipesDb = require('../models/recipesDb');

//Global GET
router.get('/', (req, res) => {
	recipesDb
		.get()
		.then(food => {
			res.status(200).json(food);
		})
		.catch(err => {
			res
				.status(500)
				.json({ message: 'There was an error getting the recipes.', err });
		});
});

//GET by id
router.get('/:id', (req, res) => {
	const id = req.params.id;

	recipesDb
		.getById(id)
		.then(found => {
			res.status(200).json(found);
		})
		.catch(err => {
			res
				.status(500)
				.json({ message: 'There was an error getting that recipe.', err });
		});
});

//POST
router.post('/', (req, res) => {
	const recipeData = req.body;
	recipesDb
		.add(recipeData)
		.then(newRecipe => {
			res.status(201).json(newRecipe);
		})
		.catch(err => {
			res.status(500).json({ message: 'Error creating that recipe.', err });
		});
});

//PUT by id
router.put('/:id', (req, res) => {
	const id = req.params.id;
	const changes = req.body;

	recipesDb
		.getById(id)
		.then(found => {
			recipesDb
				.update(id, changes)
				.then(recipeUpdate => {
					res.status(200).json(recipeUpdate);
				})
				.catch(err => {
					res.status(500).json({ message: 'Error updating that recipe!', err });
				});
		})
		.catch(err => {
			res.status(500).json({ message: ' Error finding that recipe!', err });
		});
});

//DELETE by id
router.delete('/:id', (req, res) => {
	const id = req.params.id;

	recipesDb
		.getById(id)
		.then(deletedRecipe => {
			recipesDb
				.remove(id, deletedRecipe)
				.then(gone => {
					res
						.status(200)
						.json({ message: `Recipe id: ${id} was deleted.`, deletedRecipe });
				})
				.catch(err => {
					res.status(500).json({ message: 'Error deleting the recipe.', err });
				});
		})
		.catch(err => {
			res.status(500).json({ message: 'Error finding that recipe.', err });
		});
});

module.exports = router;
