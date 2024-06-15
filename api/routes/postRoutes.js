const express = require('express');
const multer = require('multer');
const moment = require('moment');
const Post = require('../models/Post');
const { getPostById, deletePost, updatePost, getAllPosts, likePost, addComment } = require('../controllers/postController');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, moment().format('YYYYMMDDHHmmss') + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Routes
router.get('/:id', getPostById);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);
router.get('/', getAllPosts);
router.put('/like/:id', likePost);
router.post('/comment/:id', addComment);

router.post('/', upload.single('file'), async (req, res) => {
  const { title, desc, cat, username } = req.body;
  const img = req.file ? req.file.filename : null;

  try {
    const newPost = new Post({ title, desc, cat, img, username });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating post' });
  }
});

module.exports = router;
