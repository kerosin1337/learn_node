const Router = require('express'),
    router = new Router(),
    jwt = require('jsonwebtoken'),
    userController = require('../controllers/user.controller.js'),
    tokenKey = '1a2b-3c4d-5e6f-7g8h',
    {User} = require("../models/index.js").sequelize.models;
const {body, check} = require("express-validator");

const auth = async (req, res, next) => {
    if (req.headers.authorization) {
        const users = await User.findAll();
        // res.json(jwt.decode(req.headers.authorization.split(' ')[1]))
        jwt.verify(
            req.headers.authorization.split(' ')[1],
            tokenKey,
            (err, payload) => {
                if (err) next()
                else if (payload) {
                    for (let user of users) {
                        if (user.id === payload.id) {
                            req.user = user
                            next()
                        }
                    }
                    if (!req.user) {
                        // next()
                        res.statusCode = 401;
                        res.json({
                            error: 'Unauthorized.'
                        })
                    }
                }
            }
        )
    } else {
        res.statusCode = 401;
        res.json({
            error: 'Unauthorized.'
        })
    }
    // next()
};
const checkId = async (req, res, next) => {
    if (await User.findByPk(req.params.id)) {
        next()
    } else {
        res.statusCode = 400;
        res.json({
            error: `Record number ${req.params.id} not found.`
        })
    }
};
router.get('/:id', auth, checkId, userController.getUser.bind(userController));
router.get('/', auth, userController.getUsers.bind(userController));
router.put('/:id', auth, checkId,
    body('username')
        .notEmpty()
        .custom(async (value) => {
            return await User.findOne({where: {username: value}}).then((user) => {
                if (user) {
                    return Promise.reject('Username already in user')
                }
            })
        }),
    body('password')
        .isLength({min: 6, max: 20}).withMessage('6 to 20 characters'),
    userController.updateUser.bind(userController));
router.delete('/:id', auth, checkId, userController.deleteUser.bind(userController));


module.exports = router;
