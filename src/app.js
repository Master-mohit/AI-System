const express = require('express');
const authrouters = require('./routes/auth.routes');
const cookie = require('cookie-parser');

const app = express();
app.use(cookie());

app.use(express.json());

app.use('/api/auth', authrouters);


module.exports = app;