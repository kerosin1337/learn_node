const {Post, User} = require('../models/index.js').sequelize.models,
    jwt = require('jsonwebtoken'),
    tokenKey = '1a2b-3c4d-5e6f-7g8h',
    {validationResult} = require('express-validator');


class PostController {
    async getPost(req, res) {
        res.send(await Post.findByPk(req.params.id, {
            include: [
                {
                    as: 'author',
                    model: User
                }
            ]
        }))
    }

    async getPosts(req, res) {
        res.send(await Post.findAll({
            include: [
                {
                    model: User
                }
            ]
        }))
    }

    async updatePost(req, res) {
        res.send(await Post.findAll({
            include: [
                {
                    model: User
                }
            ]
        }))
    }

    async deletePost(req, res) {
        res.send(await Post.findAll({
            include: [
                {
                    model: User,
                    as: 'author'
                }
            ]
        }))
    }
}

module.exports = new PostController();
