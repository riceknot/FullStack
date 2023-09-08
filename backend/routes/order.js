const router = require('express').Router();
let Order = require('../models/order.model');

router.route('/:userId').get((req,res) => {
    Order.findById(req.params.userId)
        .then(order => res.json(order))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add/:userID/:sellerID').post((req,res) => {
    const newItem = new Order({
        productName: req.body.productName,
        productQuantity: req.body.productQuantity,
        sellerID: req.params.sellerID,
        customerID: req.params.userID,
        status: "NEW"
    });

    newItem.save()
        .then(() => res.json('Item add to cart'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').put((req, res) => {
    Order.findByIdAndUpdate(req.body._id, { status: req.body.status }, { new: true })
        .then(() => {
            console.log(`Item has been updated!`);
            Order.find()
                .then((user) => res.json(user))
                .catch((error) => console.log(error.message))
        })
        .catch((error) => console.log(error.message))
});

router.route('/customer/:userId').get((req,res) => {
    Order.find({ customerID: req.params.userId })
        .then(order => res.json(order))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/seller/:userId').get((req,res) => {
    Order.find({ sellerID: req.params.userId })
        .then(order => res.json(order))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;