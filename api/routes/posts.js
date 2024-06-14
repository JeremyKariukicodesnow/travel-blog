const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Assuming you have a Post model
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/api/posts', upload.single('file'), async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      desc: req.body.desc,
      cat: req.body.cat,
      username: req.body.username,
      userImg: req.body.userImg,
      img: req.file ? req.file.filename : null,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
