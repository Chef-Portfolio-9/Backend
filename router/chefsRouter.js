const router = require('express').Router();

const bcrypt = require('bcryptjs');

//Pull in knex helper models
const chefsDb = require('../models/chefDb');

// GET global for gathering the chefs

router.get('/', (req, res) => {
	chefsDb
		.get()
		.then(chefs => {
			res.status(200).json(chefs);
		})
		.then(err => {
			res.status(500).json({ message: 'Error getting the chefs.', err });
		});
});

// GET for grabbing a specific chef

router.get('/:id', validateId, (req, res) => {
	const id = req.params.id;

	chefsDb
		.getById(id)
		.then(found => {
			res.status(200).json(found);
		})
		.catch(err => {
			res.status(500).json({ message: 'Error getting that chef.', err });
		});
});

// GET by id for recipes

router.get('/:id/recipes', (req, res) => {
	const id = req.params.id;

	chefsDb
		.findRecipes(id)
		.then(dishes => {
			if (dishes.length) {
				res.status(200).json(dishes);
			} else {
				res.status(404).json({ message: 'Chefs recipes not found. ' });
			}
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to get the chefs recipes', err });
		});
});

// PUT for updating a chef

router.put('/:id', validateId, (req, res) => {
	const id = req.params.id;
	const changes = req.body;

	const hash = bcrypt.hashSync(changes.password, 8);

	changes.password = hash;

	if (
		!changes.username ||
		!changes.password ||
		!changes.full_name ||
		!changes.location ||
		!changes.restaurant
	) {
		res.status(400).json({ message: 'Please submit a change to the recipe.' });
	} else {
		chefsDb
			.getById(id)
			.then(found => {
				chefsDb
					.update(id, changes)
					.then(recipeUpdate => {
						res.status(200).json({
							chef_id: `${id}`,
							username: `${changes.username}`,
							password: `${changes.password}`,
							full_name: `${changes.full_name}`,
							location: `${changes.location}`,
							restaurant: `${changes.restaurant}`,
							recipeUpdate
						});
					})
					.catch(err => {
						res.status(500).json({ message: 'Error updating that chef!', err });
					});
			})
			.catch(err => {
				res.status(500).json({ message: ' Error finding that chef!', err });
			});
	}
});

// DELETE for deleting a chef
router.delete('/:id', validateId, (req, res) => {
	const id = req.params.id;

	chefsDb
		.getById(id)
		.then(deletedChef => {
			chefsDb
				.remove(id, deletedChef)
				.then(gone => {
					res
						.status(200)
						.json({ message: `Chef id: ${id} was deleted.`, deletedChef });
				})
				.catch(err => {
					res.status(500).json({ message: 'Error deleting the chef.', err });
				});
		})
		.catch(err => {
			res.status(500).json({ message: 'Error finding that chef.', err });
		});
});

// Custom middleware

function validateId(req, res, next) {
	const id = req.params.id;

	chefsDb
		.getById(id)
		.then(() => {
			next();
		})
		.catch(err => {
			res.status(404).json({ message: 'Chef id not found!', err });
		});
}
module.exports = router;
