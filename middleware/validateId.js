module.exports = (req, res, next) => {
	const id = req.params.id;

	if (!id) {
		res.status(400).json({ message: 'Missing valid id!' });
	} else {
		next();
	}
};
