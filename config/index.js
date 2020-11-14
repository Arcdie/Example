module.exports = {
  app: {
    host: 'localhost',
    url: process.env.APP_URL,
    port: process.env.APP_PORT,
    environment: process.env.NODE_ENV,
  },

  mongoConf: {
    url: `mongodb://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_BASE}?ssl=true&replicaSet=${process.env.DB_REPLICA}&authSource=admin&retryWrites=true&w=majority`,

    options: {
      keepAlive: 300000,
      connectTimeoutMS: 30000,

      useMongoClient: true,
    },
  },

  redisConf: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },

  secrets: {
    salt: process.env.SECRET_SALT,
  },

  jwt: {
    secret: process.env.SECRET_JWT,
    expires: (7 * 24 * 60 * 60), // 7 дней

    refresh: {
      maxLength: 16,
      expires: (30 * 24 * 60 * 60), // 30 дней
    },
  },
};
