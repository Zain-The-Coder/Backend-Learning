const express = require('express');
const connectDB = require('./db/db');
const authRouter = require('./routes/auth.route.js');
const cookieParser = require('cookie-parser');
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use('/api/auth' , authRouter);


connectDB();


module.exports = app;