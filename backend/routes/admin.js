const router = require('express').Router();
let User = require('../models/user.model');
let Category = require('../models/category.model');
let Product = require('../models/product.model');

router.route('/')
    .get((req, res) => {  //Send information of all sellers to Admin page.
        User.find({ role: 'seller' })
            .then((seller) => res.json(seller))
            .catch((error) => console.log(error))
    })

    .put((req, res) => {  //Update approval of a seller. 
        User.findByIdAndUpdate(req.body.userID, { pending: req.body.pending }, { new: true })
            .then((updatedUser) => {
                console.log(`User ${updatedUser.id} approval status changed!`);
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
        if (cateType === 'main') {    //If adding category is Main
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
                });

        } else if (cateType === 'sub') {   // If adding category is Sub
            Category.findOne({ id: req.body.parentID, categoryType: 'main' })  // Find an existing Main with matching ID
                .then((subCate) => {
                    if (subCate) {
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
                            })
                    } else {
                        return console.log('Cannot find Main category ID.')
                    };
                })
                .catch((error) => {
                    console.log(error.message)
                });

        } else {  //If adding category is Sub-sub (ssub)
            Category.findOne({ id: req.body.parentID, categoryType: 'sub' })  //Find existing Sub with matching ID
                .then((ssubCate) => {
                    if (ssubCate) {
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
                                console.log(error.message);
                            })
                    } else {
                        return console.log('Cannot find Sub category ID.')
                    }
                })
                .catch((error) => {
                    console.log(error.message)
                });
        }
    })


router.route('/category/delete-main')
    .post((req, res) => {
        const MainID = req.body.id;
        Category.find({ categoryType: 'sub', parentID: MainID })
            .then((foundCate) => {
                if (foundCate.length === 0) {
                    Category.findByIdAndDelete(MainID)
                        .then((deleted) => {
                            console.log('Main catergory deleted!');
                        })
                        .catch((error) => console.log(error.message))
                } else {
                    console.log('Please delete all associated sub categories.')
                }
            })
            .catch((error) => console.log(error.message))
    });

router.route('/category/delete-sub')
    .post((req, res) => {
        const SubID = req.body.id;
        Category.find({ categoryType: 'ssub', parentID: SubID })
            .then((foundCate) => {
                if (foundCate.length === 0) {
                    Category.findByIdAndDelete(SubID)
                        .then((deleted) => {
                            console.log('Sub category deleted!');
                        })
                        .catch((error) => console.log(error.message))
                } else {
                    console.log('Please delete all associated sub-sub categories first.');
                }
            })
            .catch((error) => console.log(error.message))
    });

router.route('/category/delete-ssub')
    .post((req, res) => {
        Product.find({ category: req.body.categoryName })
            .then((foundPro) => {
                if (foundPro.length === 0) {
                    Category.findOneAndDelete({ categoryName: req.body.categoryName })
                        .then((deleted) => {
                            console.log('Sub-sub category deleted!');
                        })
                        .catch((error) => console.log(error.message))
                } else {
                    console.log('Please delete all associated products.')
                }
            })
            .catch((error) => console.log(error.message))
    })


module.exports = router;
