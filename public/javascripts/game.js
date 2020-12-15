/* global io */

const socket = io.connect('/', {
  query: 'source=GAME',
});

socket.on('connect', (socket) => {
  console.log('connected to server');
});
