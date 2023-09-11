const router = require('express').Router();
let Product = require('../models/product.model');
const Category = require('../models/category.model');

//Get all products 
router.route('/').get((req, res) => {
    Product.find()
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err))
});

//Get products by seller ID and sub-sub categories
router.route('/seller/:sellerID').get((req, res) => {
    Product.find({ sellerID: req.params.sellerID })
        .then((product) => {
            Category.find({ categoryType: 'ssub' })
                .then((category) => {
                    res.json({ product: product, category: category });
                })
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

//Create new product by seller
router.route('/seller/:userID/add').post((req, res) => {
    const newProduct = new Product({
        category: req.body.category,
        name: req.body.name,
        price: req.body.price,
        sellerID: req.params.userID
    });
    newProduct.save()
        .then(() => res.json('Product added'))
        .catch(err => res.status(400).json('Error: ' + err));

});

//Get product by ID (for Product page)
router.route("/:id").get((req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Delete product by ID
router.route("/:id").delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Update product
router.route("/update/:id").post((req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.category = req.body.category;
            product.name = req.body.name;
            product.price = req.body.price;
            product.sellerID = product.sellerID;

            product.save()
                .then(() => res.json('Product updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
