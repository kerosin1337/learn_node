const {User} = require('../models/index.js').sequelize.models,
    jwt = require('jsonwebtoken'),
    tokenKey = '1a2b-3c4d-5e6f-7g8h';

class AuthController {
    async login(req, res) {
        await User.findOne({
            where: {
                username: req.body.username
            }
        }).then(async (user) => {
            if (!user || !await user.validPassword(req.body.password)) {
                res.status(401).json({message: 'Unauthorized.'})
            } else {
                res.status(200).json({
                    id: user.id,
                    username: user.username,
                    token: jwt.sign({id: user.id}, tokenKey),
                })
            }
        });
        // for (let user of users) {
        //     if (
        //         req.body.username === user.username &&
        //         user.validPassword(req.body.password) === user.password
        //     ) {
        //         res.status(200).json({
        //             id: user.id,
        //             username: user.username,
        //             token: jwt.sign({id: user.id}, tokenKey),
        //         })
        //     }
        // }
    }

    async register(req, res) {
        const {username, password} = req.body;
        await User.create({username, password}).then((user) => res.json({
            user,
            message: 'Created.'
        })).catch(((err) => {
            res.json(err.errors)
        }));
    }
}

module.exports = new AuthController();
