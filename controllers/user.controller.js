const {validationResult} = require('express-validator'),
    {User, Post} = require('../models/index.js').sequelize.models;

class UserController {
    // async createUser(req, res) {
    //     const {username, password} = req.body;
    //     await db.sequelize.models.User.create({username, password}).then((user) => res.json(user));
    // }
    validateError(req, res) {
        if (!validationResult(req).isEmpty()) {
            res.status(400).json({errors: validationResult(req).array()});
        }
    }

    async getUsers(req, res) {
        this.validateError(req, res);
        const {username} = req.body;
        await User.findAll()
            .then((users) => res.json(users))
            .catch((e) => {
                res.send({'error': e.message}).statusCode(400);
            })
    }

    async getUser(req, res) {
        await User.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Post,
                    as: 'posts'
                }
            ]
        }).then((user) => res.json(user))
    }

    async updateUser(req, res) {
        this.validateError(req, res);
        const {username, password} = req.body;
        await User.update({
            username,
            password
        }, {where: {id: req.params.id}}).then((user) => res.json(user))
    }

    async deleteUser(req, res) {
        await User.destroy({where: {id: req.params.id}}).then(() => res.json('Deleted.'))
    }
}

module.exports = new UserController();
