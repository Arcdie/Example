const moment = require('moment');
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

const {
  jwt: {
    secret,
    expires,

    refresh,
  },
} = require('../config');

const {
  randStr,
} = require('./support');

/* lib/jwt */

exports.generateAccessToken = (options) => {
  return {
    value: jsonwebtoken.sign(options, secret, {
      expiresIn: expires,
    }),

    expires: moment()
      .add(expires, 'seconds')
      .unix(),
  };
};

exports.generateRefreshToken = () => {
  return {
    value: randStr(refresh.maxLength),
    expires: moment().add(refresh.expires, 'seconds').toISOString(),
  };
};
