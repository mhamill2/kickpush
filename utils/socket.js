const { User } = require('../models/user');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('sendMessage', (message, callback) => {
      const userId = message.receiver;
      const user = User.findById(userId);

      if (user.socketId) {
        io.to(user.socketId).emit('message', message);
      }
    });

    socket.on('setSocketId', (userId) => {
      addSocketIdInDB(socket.id, userId);
    });
  });
};

async function addSocketIdInDB(socketId, userId) {
  try {
    const user = await User.findById(userId);
    user.socketIds = user.socketIds.concat({ socketId });
    await user.save();
  } catch (err) {
    console.log('Error: Failed to add socket id to user: ', userId);
    console.log(err);
  }
}
