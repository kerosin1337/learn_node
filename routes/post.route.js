const Router = require('express'),
    router = new Router(),
    {body} = require('express-validator'),
    {User} = require('../models/index.js').sequelize.models,
    postController = require('../controllers/post.controller.js');


router.get('/:id', postController.getPost.bind(postController))
router.get('(s)?/', postController.getPosts.bind(postController));
router.put('/:id',
    postController.updatePost.bind(postController));
router.delete('/:id', postController.deletePost.bind(postController));


module.exports = router;

module.exports = router;
