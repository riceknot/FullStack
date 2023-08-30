const router = require('express').Router();
let Customer = require('../models/customer.model');

router.route('/').get((req,res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req,res) => {
    const email = req.body.email;
    const number = req.body.number;
    const password = req.body.password;
    const address = req.body.address;

    const newCustomer = new Customer({
        email, 
        number, 
        password, 
        address
    });

    newCustomer.save()
        .then(() => res.json('Customer added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/:id").get((req,res) => {
    Customer.findById(req.params.id)
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/:id").delete((req,res) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(() => res.json('Customer deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/update/:id").post((req,res) => {
    Customer.findById(req.params.id)
        .then(customer => {
            customer.email = req.body.email;
            customer.number = req.body.number;
            customer.password = req.body.password;
            customer.address = req.body.address;

            customer.save()
                .then(() => res.json('Cutsomer updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;