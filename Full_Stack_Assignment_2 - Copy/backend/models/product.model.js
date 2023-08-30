const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    category: {
        type: String,
        required: 'Category is required'
    },
    name: {
        type: String,
        required: 'Product name is required'
    },
    price: {
        type: Number,
        required: 'Price is required'
    },
    // sellerID: {
    //     type: String,
    // }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;