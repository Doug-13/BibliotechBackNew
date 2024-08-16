const crypto = require('crypto');
const jwtSecret = crypto.randomBytes(128).toString('hex');
console.log(jwtSecret);
