/* global io */

const socket = io.connect('/', {
  query: 'source=CHAT',
});

socket.emit('action', true);

// socket.on('connect', (socket) => {
//   console.log('connected to server');
// });
