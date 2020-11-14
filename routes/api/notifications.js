const router = require('express').Router();

const {
  notifications,
} = require('../../controllers/api');

/* router/api/notifications */

router.get('/:userId', notifications.get);

router.post('/', notifications.addNew);

module.exports = router;
