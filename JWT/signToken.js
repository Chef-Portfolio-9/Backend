const jwt = require('jsonwebtoken');

module.exports = (user) => {
	const payload = {
	  username: user.username
	};
  
	const secret = process.env.JWT_SECRET;
  
	const options = {
	  expiresIn: "1h",
	};
  
	return jwt.sign(payload, secret, options); 
  }