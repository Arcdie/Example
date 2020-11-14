const path = require('path');

let fileEnv = 'config/envs/';

switch (process.env.INIT_CWD) {
  case '/home/example/www/example.com': fileEnv = '.env'; break;

  default: { fileEnv += 'localhost.env'; break; }
}

require('dotenv').config({
  path: path.join(__dirname, `../${fileEnv}`),
});

require('./databases/mongodb');

const csrf = require('csurf');
const helmet = require('helmet');
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

const morgan = require('./loggers/morgan');
const log = require('./loggers/winston')(module);

const app = express();

// Security
app.use(helmet());

// Page Rendering
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

// Favicon
app.use(favicon(path.join(__dirname, '../public/images/favicon', 'favicon.ico')));

// bodyParser
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(express.static(path.join(__dirname, '../public')));

if (process.env.environment !== 'production') {
  app.use(morgan);
}

// app.use(csrf({ cookie: true }));

// Routing
app.use('/', require('../routes'));

// Error handing
app.use((req, res) => {
  res
    .status(404)
    .render('http/404');
});

app.use((err, req, res, next) => {
  log.warn(err);

  if (req.method === 'GET') {
    res
      .status(500)
      .render('http/500');
  } else {
    res
      .status(500)
      .json({
        success: false,
        text: 'Произошла ошибка на сервере',
      });
  }
});

process.on('uncaughtException', (err) => {
  log.error(err);
  process.exit(1);
});

module.exports = app;
