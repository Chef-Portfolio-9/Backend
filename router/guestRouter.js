const router = require('express').Router();

//Pull in knex helper models
const guestDb = require('../models/guestDb');

//Global GET
router.get('/dish/', (req, res) => {
	guestDb
		.get()
		.then(dish => {
			res.status(200).json(dish);
		})
		.catch(err => {
			res.status(500).json({ message: 'Error getting the recipes.' });
		});
});

//GET by id
router.get('/dish/:id', validateRecipeId, (req, res) => {
	const id = req.params.id;

	guestDb
		.getById(id)
		.then(found => {
			res.status(200).json(found);
		})
		.catch(err => {
			res.status(500).json({ message: 'Error finding that recipe.', err });
		});
});

//Global GET
router.get('/chef/', (req, res) => {
	guestDb
		.find()
		.then(chefs => {
			res.status(200).json(chefs);
		})
		.catch(err => {
			res.status(500).json({ message: 'Error finding the chefs.', err });
		});
});

//GET by id
router.get('/chef/:id', validateChefId, (req, res) => {
	const id = req.params.id;

	guestDb
		.findBy(id)
		.then(found => {
			res.status(200).json(found);
		})
		.catch(err => {
			res.status(500).json({ message: 'Error getting that chef.', err });
		});
});

// GET by id for recipes

router.get('/chef/:id/recipes', (req, res) => {
	const id = req.params.id;

	guestDb
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

// custom middleware

function validateRecipeId(req, res, next) {
	const id = req.params.id;

	guestDb
		.getById(id)
		.then(() => {
			next();
		})
		.catch(err => {
			res.status(404).json({ message: 'recipe id not found!', err });
		});
}

function validateChefId(req, res, next) {
	const id = req.params.id;

	guestDb
		.findBy(id)
		.then(() => {
			next();
		})
		.catch(err => {
			res.status(404).json({ message: 'chef id not found.', err });
		});
}
module.exports = router;
