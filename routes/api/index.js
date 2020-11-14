const router = require('express').Router();

/* router/api/index */

router.use('/notifications', require('./notifications'));

module.exports = router;
