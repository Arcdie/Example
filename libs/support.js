const crypto = require('crypto');
const escape = require('escape-html');

/* lib/support */

exports.disinfect = str => escape(str);
exports.randStr = limit => crypto.randomBytes(20).toString('hex').substring(0, limit);


exports.randNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};
