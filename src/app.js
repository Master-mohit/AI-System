const express = require('express');
const authrouters = require('./routes/auth.routes');

const app = express();

app.use(express.json());

app.use('/api/auth', authrouters);


module.exports = app;