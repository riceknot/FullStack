const router = require('express').Router();
let User = require('../models/user.model');

router.route('/')
    .get((req, res) => {  //Send information of all sellers to Admin page.
        User.find({ role: 'seller' })
            .then((seller) => res.json(seller))
            .catch((error) => console.log(error))
    })

    .put((req, res) => {  //Update approval of a seller. 
        User.findByIdAndUpdate(req.body.userID, { pending: req.body.pending }, { new: true })
            .then((updatedUser) => {
                console.log(`User ${updatedUser.id} has been approved!`);
                User.find({ role: 'seller' })
                    .then((user) => res.json(user))
                    .catch((error) => console.log(error.message))
            })
            .catch((error) => console.log(error.message))
    });


module.exports = router;