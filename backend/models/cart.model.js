const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    id: {
        type: String
    },
    name: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    customerID: {
        type: String
    },
    sellerID: {
        type: String
    }
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;