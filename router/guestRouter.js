const router = require('express').Router();

//Pull in knex helper models
const guestDb = require('../models/guestDb');

//Global GET
router.get('/dish/', (req, res) => {
    guestDb.get()
    .then(dish => {
        res.status(200).json(dish)
    })
    .catch(err => {
        res.status(500).json({message: 'Error getting the recipes.'})
    })
});

//GET by id
router.get('/dish/:id', validateRecipeId, (req, res) => {
    const id = req.params.id

    guestDb.getById(id)
    .then(found => {
        res.status(200).json(found)
    })
    .catch(err => {
        res.status(500).json({message: 'Error finding that recipe.', err})
    })
});

//Global GET
router.get('/chef/', (req, res) => {
    guestDb.find()
    .then(chefs => {
        res.status(200).json(chefs)
    })
    .catch(err => {
        res.status(500).json({message: 'Error finding the chefs.', err})
    })
});

//GET by id
router.get('/chef/:id', validateChefId, (req, res) => {
    const id =req.params.id

    guestDb.findBy(id)
    .then(found => {
        res.status(200).json(found)
    })
    .catch(err => {
        res.status(500).json({message: 'Error getting that chef.', err})
    })
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
			res.status(404).json({ message: 'Invalid recipe id!', err });
		});
}

function validateChefId(req, res, next) {
    const id = req.params.id

    guestDb.findBy(id)
    .then(() => {
        next()
    })
    .catch(err => {
        res.status(404).json({message: 'Invalid chef id.', err})
    })
}
module.exports = router;