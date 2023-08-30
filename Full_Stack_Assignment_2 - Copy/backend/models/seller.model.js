const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    email: {
        type: String,
        required: 'Email address is required',
        unique: true,
        trim: true,
        min: 11,
    },
    phone: {
        type: Number,
        required: 'Phone number is required',
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: 'Password is required',
    },
    businessName: {
        type: String,
        required: 'Business name is required'
    }
}, {
    timestamps: true
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;