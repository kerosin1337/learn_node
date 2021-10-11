const Router = require('express'),
    router = new Router(),
    jwt = require('jsonwebtoken'),
    userController = require('../controllers/user.controller.js'),
    tokenKey = '1a2b-3c4d-5e6f-7g8h';
const db = require("../models/index.js").sequelize.models;
const {body, check} = require("express-validator");

const auth = async (req, res, next) => {
    if (req.headers.authorization) {
        const users = await db.User.findAll();
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
    if (await db.User.findByPk(req.params.id)) {
        next()
    } else {
        res.statusCode = 400;
        res.json({
            error: `Record number ${req.params.id} not found.`
        })
    }
};
router.get('/user/:id', auth, checkId, userController.getUser);
router.get('/users', auth, userController.getUsers);
// router.post('/user', userController.createUser);
router.put('/user/:id', auth, checkId, userController.updateUser);
router.delete('/user/:id', auth, checkId, userController.deleteUser);


module.exports = router;
