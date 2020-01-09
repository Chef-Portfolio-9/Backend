module.exports = (req, res, next) => {
    const post = req.body
	if (!post.username && !post.password) {
		res.status(400).json({ message: 'Please Provide Credentials' });
	} else {
		next();
	}
};