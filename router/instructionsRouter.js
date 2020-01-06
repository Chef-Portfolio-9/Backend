const router = require('express').Router();

//Pull in knex helper models
const instructionsDb = require('../models/instructionDb');

//Global GET
router.get('/', (req, res) => {
	instructionsDb
		.get()
		.then(steps => {
			res.status(200).json(steps);
		})
		.catch(err => {
			res.status(500).json({ message: 'Error getting the instructions!', err });
		});
});

//GET by id
router.get('/:id', validateId, (req, res) => {
	const id = req.params.id;

	instructionsDb
		.getById(id)
		.then(found => {
			res.status(200).json(found);
		})
		.catch(err => {
			res
				.status(500)
				.json({ message: 'Error acquiring that instruction!', err });
		});
});

//POST
router.post('/', validatePost, (req, res) => {
	const instruction = req.body;

	instructionsDb
		.add(instruction)
		.then(newStep => {
			res.status(201).json(newStep);
		})
		.catch(err => {
			res.status(500).json({ message: 'Error creating the instruction', err });
		});
});

//PUT by id
router.put('/:id', validateId, (req, res) => {
    const id = req.params.id
    const changes = req.body

    if (!changes.recipe_id || !changes.step_number || !changes.instruction) {
		res.status(400).json({ message: 'Please submit a change to the instruction.' });
	} else {
		instructionsDb
			.getById(id)
			.then(found => {
				instructionsDb
					.update(id, changes)
					.then(instructionsUpdate => {
						res.status(200).json({instruction_id: `${id}`, recipe_id: `${changes.recipe_id}` , step_number: `${changes.step_number}`,updated_instruction: `${changes.instruction}`, instructionsUpdate});
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
router.delete('/:id', validateId, (req, res) => {
    const id = req.params.id;

	instructionsDb
		.getById(id)
		.then(deletedInstruction => {
			instructionsDb
				.remove(id, deletedInstruction)
				.then(gone => {
					res
						.status(200)
						.json({ message: 'Instruction was deleted.', deletedInstruction });
				})
				.catch(err => {
					res.status(500).json({ message: 'Error deleting the Instruction.', err });
				});
		})
		.catch(err => {
			res.status(500).json({ message: 'Error finding that Instruction.', err });
		});
});

// Custom middleware

function validateId(req, res, next) {
	const id = req.params.id;

	instructionsDb
		.getById(id)
		.then(() => {
			next();
		})
		.catch(err => {
			res.status(404).json({ message: 'Invalid instruction id!', err });
		});
}

function validatePost(req, res, next) {
	const post = req.body

	if(!post.recipe_id && !post.step_number && !post.instruction) {
		res.status(400).json({message: 'Missing needed Post data!'})
	} else {
		next ();
	}
}

module.exports = router;
