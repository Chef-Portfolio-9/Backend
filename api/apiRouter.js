const router = require('express').Router();

// Pull in Routers---------------------------------------
const authRouter = require('../router/authRouter');
const chefRouter = require('../router/chefRouter');

// Pull in custom middleware-----------------------------
const restricted = require('../middleware/restricted');
const validateAuth = require('../middleware/validateAuth');

router.use('/api/auth', validateAuth, authRouter)
router.use('/api/chef_portfolio', restricted, chefRouter);

// Global test endpoint----------------------------------
router.get('/', (req, res) => {
res.send(`<h3>Let's Get Cooking!</h3>`)
});

module.exports = router;