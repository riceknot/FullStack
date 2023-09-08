const router = require('express').Router();
let Cart = require('../models/cart.model');

router.route('/').get((req,res) => {
    Cart.find()
        .then(cart => res.json(cart))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add/:userID').post((req,res) => {
    const newItem = new Cart({
        id: req.body.id,
        name: req.body.name,
        quantity: req.body.quantity,
        customerID: req.params.userID,
        sellerID: req.body.sellerID
    });

    newItem.save()
        .then(() => res.json('Item add to cart'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').put((req, res) => { 
    Cart.findByIdAndUpdate(req.body._id, { quantity: req.body.quantity }, { new: true })
        .then(() => {
            console.log(`Item has been updated!`);
            Cart.find()
                .then((user) => res.json(user))
                .catch((error) => console.log(error.message))
        })
        .catch((error) => console.log(error.message))
});

router.route('/delete/:id').delete((req, res) => {
    Cart.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item remove from cart'))
        .catch(err => console.log(err.message));
    
});

module.exports = router;