const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    productName: {
        type: String,
    },
    productQuantity: {
        type: Number,
    },
    sellerID: {
        type: String,
    },
    customerID: {
        type: String,
    },
    status: {
        type: String
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;