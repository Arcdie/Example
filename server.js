const fs = require('fs');
const path = require('path');
const https = require('https');

const app = require('./middleware');
const log = require('./middleware/loggers/winston')(module);
const config = require('./config');

/* Если переменная окружения localhost, поднимается приложение на 3000 порту */

if (config.app.environment === 'localhost') {
  // Только для localhost, отменяет проверку на самоподписанный сертификат
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  https.createServer({
    key: fs.readFileSync(path.join(__dirname, './config/certs/server.key')),
    cert: fs.readFileSync(path.join(__dirname, './config/certs/server.cert')),

    requestCert: false,
    rejectUnauthorized: false,
  }, app)
    .listen(config.app.port, config.app.host, (err) => {
      if (err) throw new Error(err);

      log.info(`Server running at ${config.app.url}:${config.app.port}`);
    });
} else {
  app.listen(config.app.port, config.app.host, (err) => {
    if (err) throw new Error(err);

    log.info(`Server running at ${config.app.url}:${config.app.port}`);
  });
}
