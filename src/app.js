const express = require('express');
const authrouters = require('../src/routes/auth.routes');

const app = express();

app.use(express.json());

app.use('/api/auth', authrouters);


module.exports = app;