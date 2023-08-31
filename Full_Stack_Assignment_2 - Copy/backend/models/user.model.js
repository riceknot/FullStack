const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: 'Email address is required',
        unique: true,
        trim: true,
        min: 11,
    },
    phone: {
        type: String,
        required: 'Phone number is required',
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: 'Password is required',
    },
    address: {
        type: String,
    },
    businessName: {
        type: String,
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
