const express = require('express');
const authcontroller = require('../controllers/auth.controller')

const router = express.Router();

// @route post /api/auth/register
router.post('/register', authcontroller.registerUser);
router.post('/login', authcontroller.LoginUser);







module.exports = router;