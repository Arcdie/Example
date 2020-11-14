const router = require('express').Router();

const {
  home,
} = require('../controllers/web');

/* router/web */

router.get('/', home.viewHome);

module.exports = router;
