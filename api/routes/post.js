const router = require('express').Router();
const { getPostById, deletePost, updatePost, getAllPosts, likePost, addComment } = require('../controllers/postController');

router.get('/:id', getPostById);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);
router.get('/', getAllPosts);
router.put('/like/:id', likePost);
router.post('/comment/:id', addComment);

module.exports = router;
