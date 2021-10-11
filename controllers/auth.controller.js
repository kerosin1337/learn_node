const db = require('../models/index.js'),
    jwt = require('jsonwebtoken'),
    tokenKey = '1a2b-3c4d-5e6f-7g8h',
    {validationResult} = require('express-validator');


class AuthController {
    async login(req, res) {
        const users = await db.sequelize.models.User.findAll();
        for (let user of users) {
            if (
                req.body.username === user.username &&
                req.body.password === user.password
            ) {
                res.status(200).json({
                    id: user.id,
                    username: user.username,
                    token: jwt.sign({id: user.id}, tokenKey),
                })
            }
        }
        res.status(401).json({error: 'Unauthorized.'})
    }

    async register(req, res) {
        if (!validationResult(req).isEmpty()) {
            res.status(400).json({errors: validationResult(req).array()});
        }
        const {username, password} = req.body;
        await db.sequelize.models.User.create({username, password}).then((user) => res.json({
            user,
            message: 'Created.'
        }));
    }
}

module.exports = new AuthController();
