const mongoose = require('mongoose');

const {
  mongoConf,
} = require('../../config');

const log = require('../loggers/winston')(module);

mongoose.Promise = global.Promise;

mongoose.connect(mongoConf.url, mongoConf.options)
  .then(() => log.info('Connection to mongoDB is successful'))
  .catch(err => log.error(err));

module.exports = mongoose;
