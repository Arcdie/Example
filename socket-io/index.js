const io = require('socket.io');

const chat = require('./chat');
const game = require('./game');

const {
  get,
} = require('../controllers/api/users');

const constants = require('./constants');

module.exports = (server) => {
  const socketIO = io.listen(server);

  socketIO
    .on('connection', async (socket) => {
      chat.connect();
      game.connect();

      const result = await get();
      console.log(result);

      socket.on('disconnect', (reason) => {
        chat.disconnect();
        game.disconnect();
      });

      // setTimeout(() => {
      //   socket.disconnect(true);
      // }, 2000);
    });
};
