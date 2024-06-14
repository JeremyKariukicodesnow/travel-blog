const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const moment = require('moment');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, moment().format('YYYYMMDDHHmmss') + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

const postSchema = new mongoose.Schema({
  title: String,
  desc: String,
  cat: String,
  img: String,
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).json(req.file.filename);
  } catch (err) {
    console.log(err);
    res.status(500).json('Server error');
  }
});

app.post('/posts', async (req, res) => {
  const { title, desc, cat, img } = req.body;

  try {
    const newPost = new Post({ title, desc, cat, img });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating post' });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

app.put('/posts/:id', async (req, res) => {
  const { title, desc, cat, img } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, desc, cat, img },
      { new: true }
    );
    res.json({ message: 'Post updated successfully', post: updatedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating post' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
