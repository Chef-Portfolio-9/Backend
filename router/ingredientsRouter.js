const router = require('express').Router();

//Pull in knex helper models
const ingredientsDb = require('../models/ingredientsDb');

//Global GET
router.get('/', (req, res) => {
	ingredientsDb
		.get()
		.then(groceries => {
			res.status(200).json(groceries);
		})
		.catch(err => {
			res.status(500).json({ message: 'Error getting the groceries.', err });
		});
});

//GET by id
router.get('/:id', validateId,  (req, res) => {
	const id = req.params.id;

	ingredientsDb
		.getById(id)
		.then(found => {
			res.status(200).json(found);
		})
		.catch(err => {
			res
				.status(500)
				.json({ message: 'Error grabbing that grocery item.', err });
		});
});

//POST
router.post('/', validatePost, (req, res) => {
	const ingredient = req.body;

	ingredientsDb
		.add(ingredient)
		.then(newIngredient => {
			res.status(201).json(newIngredient);
		})
		.catch(err => {
			res
				.status(500)
				.json({
					message: 'Error adding the ingredient to the Grocery Store.',
					err
				});
		});
});

//PUT by id
router.put('/:id', validateId, (req, res) => {
    const id = req.params.id;
	const changes = req.body;

	if (!changes) {
		res.status(400).json({ message: 'Please submit a change to the ingredient.' });
	} else {
		ingredientsDb
			.getById(id)
			.then(found => {
				ingredientsDb
					.update(id, changes)
					.then(ingredientUpdate => {
						res.status(200).json({ingredient_id: `${id}`, updated_ingredient: `${changes.ingredient_name}`, ingredientUpdate});
					})
					.catch(err => {
						res
							.status(500)
							.json({ message: 'Error updating that ingredient!', err });
					});
			})
			.catch(err => {
				res.status(500).json({ message: ' Error finding that ingredient!', err });
			});
	}
});

//DELETE by id
router.delete('/:id', validateId,  (req, res) => {
	const id = req.params.id;

	ingredientsDb
		.getById(id)
		.then(deletedIngredient => {
			ingredientsDb
				.remove(id, deletedIngredient)
				.then(gone => {
					res
						.status(200)
						.json({ message: 'Ingredient was deleted.', deletedIngredient });
				})
				.catch(err => {
					res.status(500).json({ message: 'Error deleting the ingredient.', err });
				});
		})
		.catch(err => {
			res.status(500).json({ message: 'Error finding that ingredient.', err });
		});

});

// Custom middleware

function validateId(req, res, next) {
	const id = req.params.id;

	ingredientsDb
		.getById(id)
		.then(() => {
			next();
		})
		.catch(err => {
			res.status(404).json({ message: 'Invalid ingredient id!', err });
		});
}

function validatePost(req, res, next) {
	const post = req.body

	if(!post) {
		res.status(400).json({message: 'Missing needed Post data!'})
	} else {
		next ();
	}
}

module.exports = router;
