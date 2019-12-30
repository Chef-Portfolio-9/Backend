const router = require('express').Router();

//Pull in knex helper models
const recipesDb = require('../../models/recipesDb');

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
router.get('/:id', (req, res) => {});
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
//POST
router.post('/', (req, res) => {});

//PUT by id
router.put('/:id', (req, res) => {});

//DELETE by id
router.delete('/:id', (req, res) => {});

module.exports = router;
