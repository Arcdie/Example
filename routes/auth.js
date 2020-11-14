const router = require('express').Router();

const {
  auth,
} = require('../controllers');

/* router/auth */

router.get('/login', auth.viewLogin);
router.get('/registration', auth.viewRegistration);

module.exports = router;
