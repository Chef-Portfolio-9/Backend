const router = require('express').Router();

// Pull in Routers---------------------------------------
const authChefsRouter = require('../router/auth/authChefsRouter');
const authUsersRouter = require('../router/auth/authUsersRouter');

// Pull in custom middleware-----------------------------
// const restricted = require('../middleware/restricted');
const validateAuth = require('../middleware/validateAuth');

router.use('/api/auth/chef', validateAuth, authChefsRouter)
// router.use('/api/auth/users', validateAuth, authUsersRouter);

// Global test endpoint----------------------------------
router.get('/', (req, res) => {
res.send(`<h3>Let's Get Cooking!</h3>`)
});

module.exports = router;