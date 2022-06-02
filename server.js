const express = require('express');
const path = require('path');
const userRouter = require('./routers/user');
const lessonRouter = require('./routers/lessons');
require('./db/db');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(userRouter, lessonRouter);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
