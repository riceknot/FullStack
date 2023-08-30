const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req,res) => {
    Product.find()
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req,res) => {
    const category = req.body.category;
    const name = req.body.name;
    const price = req.body.price;
    // const sellerID = req.body.sellerID;

    const newProduct = new Product({
        category,
        name,
        price
        // sellerID
    });

    newProduct.save()
        .then(() => res.json('Product added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/:id").get((req,res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

// router.route("/product/:id").get((req,res) => {
//     Product.findById(req.params.id)
//         .then(product => res.json(product))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

router.route("/:id").delete((req,res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/update/:id").post((req,res) => {
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