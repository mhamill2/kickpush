const { User } = require('../models/user');

module.exports = (io) => {
  io.on('connection', (socket) => {
    if (io.req) {
      console.log('io.req is a thing i guess');
      // addSocketIdInDB(socket.id, io.req.userId);
    }
  });
};

async function addSocketIdInDB(socket_id, user_id) {
  const user = await User.findById(user_id);
  if (socket_id) {
    user.socketId = socket_id;
  }
  await user.save();
}
