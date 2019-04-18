const path = require('path');
const config = require('./config');

exports.resolve = dir => path.join(__dirname, '..', dir);
