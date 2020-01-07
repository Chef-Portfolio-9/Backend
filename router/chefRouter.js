const router = require('express').Router();

//Pull in knex helper models
const chefsDb = require('../models/chefDb');

// GET global for gathering the chefs
router.get('/', (req, res) => {
	chefsDb.get()
	.then(chefs => {
		res.status(200).json(chefs)
	})
	.then(err => {
		res.status(500).json({message: 'Error getting the chefs.', err})
	})
});

// GET for grabbing a specific chef
router.get('/:id', validateId, (req, res) => {
	const id = req.params.id

	chefsDb.getById(id)
	.then(found => {
		res.status(200).json(found)
	})
	.catch(err => {
		res.status(500).json({message: 'Error getting that chef.', err})
	})
});

router.put('/:id', validateId, (req, res) => {
	const id = req.params.id
	const changes = req.body

	const hash = bcrypt.hashSync(changes.password, 8);

	changes.password = hash;

	if (!changes.username || !changes.password || !changes.full_name || !changes.location || !changes.restaurant) {
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
						res
							.status(500)
							.json({ message: 'Error updating that chef!', err });
					});
			})
			.catch(err => {
				res.status(500).json({ message: ' Error finding that chef!', err });
			});
	}
});

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
			res.status(404).json({ message: 'Invalid chef id!', err });
		});
}
module.exports = router;