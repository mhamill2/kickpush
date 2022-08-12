const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const userRouter = require('./routers/user');
const connectionRouter = require('./routers/connections');
const messageRouter = require('./routers/message');

require('./db/db');
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
require('./utils/socket')(io);

// print the socket io url

app.use(express.json());
app.use(connectionRouter, messageRouter, userRouter);
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
