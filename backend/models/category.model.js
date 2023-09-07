const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {
        type: String,
        unique: true
    },
    categoryType: {
        type: String,
    },
    parentID: {
        type: String,
});

const Category = mongoose.model('Category', categorySchema);

module.exports =Category;
