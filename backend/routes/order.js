const router = require('express').Router();
let Order = require('../models/order.model');

router.route('/').get((req,res) => {
    Order.find()
        .then(order => res.json(order))
        .catch(err => res.status(400).json('Error: ' + err))
});