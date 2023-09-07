const router = require('express').Router();
let User = require('../models/user.model');
let Category = require('../models/category.model');

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

router.route('/category')
    .get((req, res) => {  //Send category information to Admin page
        Category.find()
            .then((cate) => {
                res.json(cate);
            })
            .catch((error) => console.log(error.message))
    })

router.route('/category/add')
    .post((req, res) => {  //Send category information to Admin page
        const cateType = req.body.categoryType;
        if (cateType === 'main') {
            const newCate = new Category({
                categoryName: req.body.categoryName,
                categoryType: req.body.categoryType,
                parentID: ''
            });
            newCate.save()
                .then(() => {
                    console.log('New main category added!');
                    return res.send('New main category added!');
                })
                .catch((error) => {
                    console.log(error.message)
                    return res.send('Error with adding main category.')
                });
        } else if (cateType === 'sub') {
            Category.findOne({ id: req.body.parentID, categoryType: 'main' })
                .then((subCate) => {
                    const newCate = new Category({
                        categoryName: req.body.categoryName,
                        categoryType: req.body.categoryType,
                        parentID: req.body.parentID
                    });
                    newCate.save()
                        .then(() => {
                            console.log('New sub category added!');
                            return res.send('New sub category added!');
                        })
                        .catch((error) => {
                            console.log(error.message)
                            return res.send('Error with adding sub category.')
                        });
                })
                .catch((error) => {
                    console.log(error.message)
                    return res.send('Error with adding sub category.')
                });
        } else {
            Category.findOne({ id: req.body.parentID, categoryType: 'sub' })
                .then((ssubCate) => {
                    const newCate = new Category({
                        categoryName: req.body.categoryName,
                        categoryType: req.body.categoryType,
                        parentID: req.body.parentID
                    });
                    newCate.save()
                        .then(() => {
                            console.log('New Sub-Sub category added!');
                            return res.send('New Sub-Sub category added!');
                        })
                        .catch((error) => {
                            console.log(error.message)
                            return res.send('Error with adding sub-sub category.')
                        });
                })
                .catch((error) => {
                    console.log(error.message)
                    return res.send('Error with adding sub-sub category.')
                });
        }
    })

module.exports = router;
