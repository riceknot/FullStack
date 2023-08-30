const mongoose = require('mongoose');
// const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    email: {
        type: String,
        required: 'Email address is required',
        unique: true,
        trim: true,
        min: 11,
    },
    number: {
        type: Number,
        required: 'Phone number is required',
    },
    password: {
        type: String,
        required: 'Password is required',
    },
    address: {
        type: String,
        required: 'Address is required'
    }
}, {
    timestamps: true
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;