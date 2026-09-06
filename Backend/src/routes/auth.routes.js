const express = require('express');
const authcontroller = require('../controllers/auth.controller');
const {authmiddleware} = require('../middleware/auth.middleware');

const router = express.Router();

// @route post /api/auth/register
router.post('/register', authcontroller.registerUser);
router.post('/login', authcontroller.LoginUser);
router.get('/logout', authcontroller.LogoutUser);
router.get('/getUser',authmiddleware, authcontroller.GetUser); 







module.exports = router;