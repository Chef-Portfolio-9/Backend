const router = require('express').Router();


const authRouter = require('../router/authRouter');
const chefRouter = require('../router/chefRouter');

const restricted = require('../middleware/restricted');

router.use('/api/auth', authRouter)
router.use('/api/chef_portfolio', restricted, chefRouter);

// Global test endpoint
router.get('/', (req, res) => {
res.send(`<h3>Let's Get Cooking!</h3>`)
});

module.exports = router;