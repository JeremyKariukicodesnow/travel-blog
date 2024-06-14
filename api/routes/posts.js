const express = require('express');
const multer = require('multer');
const moment = require('moment');
const Post = require('../models/Post'); // Adjust the path as needed
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const router = express.Router();

router.use(cors()); // Enable CORS
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, moment().format('YYYYMMDDHHmmss') + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
  const { title, desc, cat, img } = req.body;
//   const img = req.file;

  try {
    const newPost = new Post({ title, desc, cat, img });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating post' });
  }
});

module.exports = router;
