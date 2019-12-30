module.exports = (req, res, next) => {
    const data = req.body

    if (!data) {
        res.status(400).json({ message: "Missing needed data." })
    } else {
        next();
    }
}