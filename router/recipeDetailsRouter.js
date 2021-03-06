const router = require('express').Router();

//Pull in knex helper models
const recipeDetailsDb = require('../models/recipeIngredientsDetailsDb');

//Global GET
router.get('/', (req, res) => {
	recipeDetailsDb
		.get()
		.then(recipeInfo => {
			res.status(200).json(recipeInfo);
		})
		.catch(err => {
			res.status(500).json({ message: 'Error getting the recipes details!' });
		});
});

//GET by id
router.get('/:id', validateId, (req, res) => {
	const id = req.params.id;

	recipeDetailsDb
		.getById(id)
		.then(found => {
			res.status(200).json(found);
		})
		.catch(err => {
			res
				.status(500)
				.json({ message: 'Error getting the details of that recipe!', err });
		});
});

// GET by id for finding recipe ingredients
router.get('/:id/ingredients', validateId, (req, res) => {
	const id = req.params.id;

	recipeDetailsDb
		.findIngredients(id)
		.then(found => {
			if (found.length) {
				res.status(200).json(found);
			} else {
				res
					.status(404)
					.json({ message: 'Recipe ingredients not found!' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to get the recipe ingredients' });
		});
});

//POST
router.post('/', validatePost, (req, res) => {
	const recipeDetails = req.body;

	recipeDetailsDb
		.add(recipeDetails)
		.then(newDetails => {
			res.status(201).json(newDetails);
		})
		.catch(err => {
			res
				.status(500)
				.json({ message: 'Error creating the recipe details.', err });
		});
});

//PUT by id
router.put('/:id', validateId, (req, res) => {
	const id = req.params.id;
	const changes = req.body;

	if (
		!changes.recipe_id ||
		!changes.quantity ||
		!changes.measurement_unit ||
		!changes.ingredient_id
	) {
		res
			.status(400)
			.json({ message: 'Please submit a change to the recipe details.' });
	} else {
		recipeDetailsDb
			.getById(id)
			.then(found => {
				recipeDetailsDb
					.update(id, changes)
					.then(detailsUpdate => {
						res
							.status(200)
							.json({
								recipeDetails_id: `${id}`,
								recipe_id: `${changes.recipe_id}`,
								quantity: `${changes.quantity}`,
								measurement_unit: `${changes.measurement_unit}`,
								ingredient_id: `${changes.ingredient_id}`,
								detailsUpdate
							});
					})
					.catch(err => {
						res
							.status(500)
							.json({ message: 'Error updating the recipe details!', err });
					});
			})
			.catch(err => {
				res
					.status(500)
					.json({ message: ' Error finding those recipe details!', err });
			});
	}
});

//DELETE by id
router.delete('/:id', validateId, (req, res) => {
	const id = req.params.id;

	recipeDetailsDb
		.getById(id)
		.then(deletedDetails => {
			recipeDetailsDb
				.remove(id, deletedDetails)
				.then(gone => {
					res
						.status(200)
						.json({ message: 'Recipe Details were deleted.', deletedDetails });
				})
				.catch(err => {
					res
						.status(500)
						.json({ message: 'Error deleting the recipe details.', err });
				});
		})
		.catch(err => {
			res
				.status(500)
				.json({ message: 'Error finding those recipe details.', err });
		});
});

// Custom middleware

function validateId(req, res, next) {
	const id = req.params.id;

	recipeDetailsDb
		.getById(id)
		.then(() => {
			next();
		})
		.catch(err => {
			res.status(404).json({ message: 'Recipe details id not found!', err });
		});
}

function validatePost(req, res, next) {
	const post = req.body;

	if (
		!post.recipe_id &&
		!post.quantity &&
		!post.measurement_unit &&
		!post.ingredient_id
	) {
		res.status(400).json({ message: 'Missing needed Post data!' });
	} else {
		next();
	}
}

module.exports = router;
