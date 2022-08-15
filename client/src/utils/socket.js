import io from 'socket.io-client';

import { deleteSocket } from '../state/user/userActions';

const createNewSocket = (userId, messages, dispatch) => {
  const socket = io('http://localhost:5000', {
    transports: ['websocket', 'polling', 'flashsocket'],
    reconnection: true,
    reconnectionDelay: 1000
  });

  socket.on('connect', () => {
    socket.emit('setSocketId', userId);
  });

  socket.on('newMessage', (message) => {
    if (messages.filter((msg) => msg._id === message._id).length === 0) {
      dispatch({ type: 'ADD_NEW_MESSAGE', payload: message });
    }
  });

  socket.on('disconnect', () => {
    deleteSocket(socket);
  });
};

export { createNewSocket };
