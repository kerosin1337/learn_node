const db = require('../models/index.js').sequelize.models;

class UserController {
    // async createUser(req, res) {
    //     const {username, password} = req.body;
    //     await db.sequelize.models.User.create({username, password}).then((user) => res.json(user));
    // }

    async getUsers(req, res) {
        await db.User.findAll({where: req.body})
            .then((users) => res.json(users))
            .catch((e)=>{
                res.send({'error': e.message}).statusCode(400);
            })
    }

    async getUser(req, res) {
        await db.User.findByPk(req.params.id).then((user) => res.json(user))
    }

    async updateUser(req, res) {
        const {username, password} = req.body;
        await db.User.update({
            username,
            password
        }, {where: {id: req.params.id}}).then((user) => res.json(user))
    }

    async deleteUser(req, res) {
        await db.User.destroy({where: {id: req.params.id}}).then(() => res.json('Deleted.'))
    }
}

module.exports = new UserController();
