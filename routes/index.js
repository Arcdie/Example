const router = require('express').Router();

/* router/index */

router.use('/api', require('./api'));
router.use('/', require('./web'));

/*
router.use('/', (req, res, next) => {
  if (!req.user) {
    return res.redirect('/auth/login');
  }

  next();
}, require('./web'));


router.use('/auth', (req, res, next) => {
  if (req.user) {
    return res.redirect('/');
  }

  next();
}, require('./auth'));
*/

module.exports = router;
