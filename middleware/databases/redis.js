const redis = require('redis');
const log = require('../../middleware/logger')(module);

const {
  redisConf,
} = require('../../config');

redis.client = redis.createClient({
  host: redisConf.host,
  port: redisConf.port,
});

redis.client.on('connect', () => log.info('Connection to Redis is successful'));
redis.client.on('error', err => log.error(err));

module.exports = redis;
