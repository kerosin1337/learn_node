const Router = require('express'),
    router = new Router(),
    {body} = require('express-validator'),
    db = require('../models/index.js').sequelize.models,
    authController = require('../controllers/auth.controller.js');


router.post('/login', authController.login);
router.post('/register',
    body('username')
        .notEmpty()
        .custom(async (value) => {
            return await db.User.findOne({where: {username: value}}).then((user) => {
                if (user) {
                    return Promise.reject('Username already in user')
                }
            })
        }),
    body('password')
        .isLength({min: 6, max: 20}).withMessage('6 to 20 characters'),
    authController.register
);


module.exports = router;
