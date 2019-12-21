const router = require('express').Router();

const authRouter = require('authRouter');
const chefRouter = require('../router/chefRouter');

router.use('/api/auth', authRouter)
router.use('/api/chef_portfolio', chefRouter);

// Global test endpoint
router.get('/', (req, res) => {
res.send(`<h3>Let's Get Cooking!</h3>`)
});

module.exports = router;