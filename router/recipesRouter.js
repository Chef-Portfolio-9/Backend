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
router.get('/:id', validateId, (req, res) => {
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
router.post('/', validatePost, (req, res) => {
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
router.put('/:id', validateId, (req, res) => {
	const id = req.params.id;
	const changes = req.body;

	if (!changes) {
		res.status(400).json({ message: 'Please submit a change to the recipe.' });
	} else {
		recipesDb
			.getById(id)
			.then(found => {
				recipesDb
					.update(id, changes)
					.then(recipeUpdate => {
						res.status(200).json({recipe_id: `${id}`, updated_recipe: `${changes.recipe_name}`, chef_id:`${changes.chef_id}`, recipeUpdate});
					})
					.catch(err => {
						res
							.status(500)
							.json({ message: 'Error updating that recipe!', err });
					});
			})
			.catch(err => {
				res.status(500).json({ message: ' Error finding that recipe!', err });
			});
	}
});

//DELETE by id
router.delete('/:id', validateId, (req, res) => {
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

// Custom middleware

function validateId(req, res, next) {
	const id = req.params.id;

	recipesDb
		.getById(id)
		.then(() => {
			next();
		})
		.catch(err => {
			res.status(404).json({ message: 'Invalid recipe id!', err });
		});
}

function validatePost(req, res, next) {
	const post = req.body

	if(!post.recipe_name && !post.chef_id) {
		res.status(400).json({message: 'Missing needed Post data!'})
	} else {
		next ();
	}
}


module.exports = router;
