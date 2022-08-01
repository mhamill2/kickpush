const express = require('express');
const path = require('path');
const userRouter = require('./routers/user');
const connectionRouter = require('./routers/connections');
const messageRouter = require('./routers/message');

require('./db/db');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(connectionRouter, messageRouter, userRouter);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
