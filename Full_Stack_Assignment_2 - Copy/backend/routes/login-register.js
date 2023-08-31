const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');

router.route('/register').post(async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hasedPASS = await bcrypt.hash(req.body.password, salt);  //Hashing (encrypting) password with Bcrypt.

        const user = new User({
            role: req.body.role,
            email: req.body.email,
            phone: req.body.phone,
            password: hasedPASS,    //Storing the hased password. 
            address: req.body.address,
            businessName: req.body.businessName
        });

        await user.save()  //Save the data into the User collection.
            .then(() => {
                res.redirect('/login');  //Redirect the user to the login page.
            })
            .catch((error) => {
                console.log(error.message);
            });

    } catch (error) {
        console.log(error.message);
    }
});

//--------Login-----------//
router.route('/login').post(async (req, res) => {
    try {
        const user = await User.findOne({ $or: [{ email: req.body.loginInput }, { phone: req.body.loginInput }] });  //Take user login input and find if it matches any data with either phone or email.
        if (user) {
            const result = bcrypt.compare(req.body.password, user.password);   //Use bcrypt to decrypt the password inside the database and compare it with the inputted password.
            if (result) {
                console.log(`Login successful as ${user.role}!`);
                return res.redirect(`/${user.role}/${user.id}`);   //Redirect user to URL based on their role and ID.
            } else {
                return console.log('Invalid credentials!');
            }
        } else {
            return console.log('Invalid credentials!');
        }
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;