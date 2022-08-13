const { User } = require('../models/user');
const ip = require('ip');

const setSocketIo = (io) => {
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

    socket.on('disconnect', async () => {
      await removeSocketIdInDB(socket.id);
    });
  });
};

async function addSocketIdInDB(socketId, userId) {
  try {
    const user = await User.findById(userId);
    user.socketIds = user.socketIds.concat({ socketId, server: ip.address() });
    await user.save();
  } catch (err) {
    console.log(`Error: Failed to add socket id to user: ${userId}, socketId: ${socketId}`);
    console.log(err);
  }
}

async function removeSocketIdInDB(socketId) {
  try {
    const user = await User.findOne({ socketIds: { $elemMatch: { socketId } } });
    user.socketIds = user.socketIds.filter((socket) => socket.socketId !== socketId);
    await user.save();
  } catch (err) {
    console.log(`Error: Failed to remove socket id from user. socketId: ${socketId}`);
    console.log(err);
  }
}

const deleteOldSocketIds = async () => {
  try {
    const users = await User.find();
    const ipAddress = ip.address();
    users.forEach(async (user) => {
      if (user.socketIds.length > 0) {
        user.socketIds = user.socketIds.filter((socket) => socket.server !== ipAddress);
        await user.save();
      }
    });
  } catch (err) {
    console.log('Error: Failed to delete old socket ids');
    console.log(err);
  }
};

module.exports = {
  deleteOldSocketIds,
  setSocketIo
};
