const router = require('express').Router();
let Seller = require('../models/customer.model');

router.route('/').get((req,res) => {
    User.find()
        .then(sellers => res.json(sellers))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req,res) => {
    const email = req.body.email;
    const number = req.body.number;
    const password = req.body.password;
    const businessName = req.body.businessName;

    const newSeller = new Seller({
        email, 
        number, 
        password, 
        businessName
    });

    newSeller.save()
        .then(() => res.json('Seller added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/:id").get((req,res) => {
    Seller.findById(req.params.id)
        .then(seller => res.json(seller))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/:id").delete((req,res) => {
    Seller.findByIdAndDelete(req.params.id)
        .then(() => res.json('Seller deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/update/:id").post((req,res) => {
    Seller.findById(req.params.id)
        .then(seller => {
            seller.email = req.body.email;
            seller.number = req.body.number;
            seller.password = req.body.password;
            seller.address = req.body.address;

            seller.save()
                .then(() => res.json('Seller updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;