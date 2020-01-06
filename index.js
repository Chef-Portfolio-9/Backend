require('dotenv').config()

const server = require('./api/server.js');

const port = process.env.PORT || 5005;

server.listen(port, () => 
console.log(`** Running on port ${port} **`));