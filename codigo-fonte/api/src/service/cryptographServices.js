const crypto = require('crypto');

const cryptografyPassword = (password) => crypto.createHash('md5').update(password).digest('hex');

module.exports = cryptografyPassword;  