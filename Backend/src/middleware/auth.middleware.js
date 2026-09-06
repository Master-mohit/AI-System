const jwt = require('jsonwebtoken');
const blackListModel = require('../models/blackListmodel');

async function authmiddleware (req, res, next) {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: 'Access denied. No token provided'
        })
    }

       const Blacklisted = await blackListModel.findOne({token});

       if(Blacklisted){
        return res.status(401).json({
            message: 'Token is invalid or expired'
        })
       }

    try{
         const decoded =  jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
    }
    catch(error){
        return res.status(401).json({
            message: 'Invalid token'
        })
        
    }
}

module.exports = { authmiddleware };