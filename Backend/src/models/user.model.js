const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, 'Username already exists']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists with this mail']
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('user', UserSchema);

module.exports = userModel;
