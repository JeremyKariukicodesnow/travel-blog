const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User'); // Assuming your User model is in a models folder

const router = express.Router();

// Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Profile Route
router.post('/', upload.single('profilePicture'), async (req, res) => {
  try {
    const { username, bio } = req.body;
    const newUser = new User({
      username,
      bio,
      profilePicture: req.file.path,
    });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
