const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BlackList = require('../models/blackListmodel');

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
    return res.status(400).json({
        message: 'Username, email, and password are required.'
    })
}

const alreadyExistsUser = await userModel.findOne({
    $or: [{ username }, { email }]
})

if(alreadyExistsUser) {
    return res.status(400).json({
        message: 'Username or email already exists.'
    })
}

console.log("Password:", password);
console.log("Password type:", typeof password);

const hashedPassword = await bcrypt.hash(password, 10);


 const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword
 })

   const token = jwt.sign(
    {
        id: newUser._id, 
        username: newUser.username,
    },
    process.env.JWT_SECRET,
    {
    expiresIn: '1d'
    }
   )
   res.cookie('token', token)

   res.status(201).json({
    message: 'User registered successfully',
    username: newUser.username,
    email: newUser.email
   })
}


async function LoginUser(req, res) {
    const {email, password} = req.body;

    const User = await userModel.findOne({email});

    if(!User){
        return res.status(400).json({
            message: 'User not found'
        })
    }

    const IsValid = await bcrypt.compare(password, User.password);

    if(!IsValid){
        return res.status(400).json({
            message: 'Invalid password'
        })      
    }
    const token =  jwt.sign(
           {
            id: User._id,
            username: User.username
           } ,
              process.env.JWT_SECRET,
           {
            expiresIn: '1d'
           }
    )

   res.cookie('token', token)

    res.status(200).json({
        message: 'User logged in successfully',
        user: {
        id: User._id,
        username: User.username,
        email: User.email
        }
    })

}

async function LogoutUser(req, res) {

    const token = req.cookies.token;

    if(token){
       await BlackList.create({token});
    }

    res.clearCookie('token');
    res.status(200).json({
        message: 'User logged out successfully'
    })
   

}

async function GetUser(req, res){
    const user = await userModel.findById(req.user.id);
    res.status(200).json({
        message : 'User fetched successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email  
        }
    })
}


module.exports = {
    registerUser,
    LoginUser,
    LogoutUser,
    GetUser
}