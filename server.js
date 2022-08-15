const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const userRouter = require('./routers/user');
const connectionRouter = require('./routers/connections');
const messageRouter = require('./routers/message');
const socketUtils = require('./utils/socket');

require('./db/db');
const PORT = process.env.PORT || 5000;

socketUtils.deleteOldSocketIds(() => {
  initServer();
});

const initServer = () => {
  const app = express();
  const server = http.createServer(app);
  const io = socketio(server);
  socketUtils.setSocketIo(io);

  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  app.use(express.json());
  app.use(connectionRouter, messageRouter, userRouter);

  server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};
