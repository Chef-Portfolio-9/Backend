const router = require('express').Router();


const bcrypt = require('bcryptjs');

// pull in signToken
const signToken = require('../../JWT/signToken');

//Pull in knex helper models
const  chefsDb = require('../../models/authModels/chefsAuthDb');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;

	const hash = bcrypt.hashSync(user.password, 8);

	user.password = hash;


	chefsDb
		.add(user)
		.then(stored => {
			res.status(201).json(stored);
		})
		.catch(err => {
			res.status(500).json(err);
		});

});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  
	chefsDb.getBy({ username })
	  .first()
	  .then(user => {
		if (user && bcrypt.compareSync(password, user.password)) {
		  // sign token
		  const token = signToken(user); 
  
		  // send the token
		  res.status(201).json({
			welcome:`${user.full_name}!`, id: `${user.id}`, token
		  });
		} else {
		  res.status(401).json({ message: "Invalid Credentials" });
		}
	  })
	  .catch(error => {
		res.status(500).json({message: "There was an error logging in",   error});
	  });
});

module.exports = router;