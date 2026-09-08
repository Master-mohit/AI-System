const express = require('express');
const authrouters = require('./routes/auth.routes');
const cookie = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cookie());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
     Credential: true
    
}))

app.use('/api/auth', authrouters);


module.exports = app;