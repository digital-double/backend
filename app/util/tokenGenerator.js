const { promisify } = require('util');
const randomBytesAsync = promisify(require('crypto').randomBytes);

exports.generateToken = () => randomBytesAsync(32);