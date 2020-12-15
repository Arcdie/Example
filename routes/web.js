const router = require('express').Router();

const {
  home,
  chat,
  game,
} = require('../controllers/web');

/* router/web */

router.get('/', home.viewHome);
router.get('/chat', chat.viewChat);
router.get('/game', game.viewGame);

module.exports = router;
