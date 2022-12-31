const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const socketUtils = require('./utils/socket');
const connectionRouter = require('./routers/connections');
const lessonRouter = require('./routers/lesson');
const messageRouter = require('./routers/message');
const paymentRouter = require('./routers/payment');
const userRouter = require('./routers/user');

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
  app.use(connectionRouter, lessonRouter, messageRouter, paymentRouter, userRouter);

  server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};
