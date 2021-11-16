const express = require('express');
const path = require('path');
const connectDB = require('./db/db');
const userRouter = require('./routers/user');
require('./db/db');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(userRouter);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
