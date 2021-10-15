const Router = require('express'),
    router = new Router(),
    {User} = require('../models/index.js').sequelize.models,
    authController = require('../controllers/auth.controller.js');


router.post('/login', authController.login.bind(authController));
router.post('/register',
    // body('username')
    //     .notEmpty()
    //     .custom(async (value) => {
    //         return await User.findOne({where: {username: value}}).then((user) => {
    //             if (user) {
    //                 return Promise.reject('Username already in user')
    //             }
    //         })
    //     }),
    // body('password')
    //     .isLength({min: 6, max: 20}).withMessage('6 to 20 characters'),
    authController.register.bind(authController)
);


module.exports = router;
