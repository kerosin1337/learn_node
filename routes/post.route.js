const Router = require('express'),
    router = new Router(),
    postController = require('../controllers/post.controller.js');


router.get('/:id', postController.getPost.bind(postController))
router.get('/', postController.getPosts.bind(postController));
router.put('/:id',
    postController.updatePost.bind(postController));
router.delete('/:id', postController.deletePost.bind(postController));


module.exports = router;

module.exports = router;
